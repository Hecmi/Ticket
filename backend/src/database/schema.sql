-- Habilitar la extensión para la generación de UUIDs si no estuviese habilitada
CREATE EXTENSION IF NOT EXISTS "uuid-ossp";

-- Creación de Enums para estados y prioridades
CREATE TYPE ticket_status AS ENUM ('OPEN', 'IN_PROGRESS', 'RESOLVED', 'CLOSED');
CREATE TYPE ticket_priority AS ENUM ('LOW', 'MEDIUM', 'HIGH', 'CRITICAL');

-- 1. Tabla: profiles (Perfiles)
CREATE TABLE profiles (
    id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
    name VARCHAR(100) UNIQUE NOT NULL,
    description VARCHAR(255),
    created_at TIMESTAMP WITH TIME ZONE DEFAULT CURRENT_TIMESTAMP,
    updated_at TIMESTAMP WITH TIME ZONE DEFAULT CURRENT_TIMESTAMP
);

-- 2. Tabla: modules (Módulos)
CREATE TABLE modules (
    id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
    name VARCHAR(100) UNIQUE NOT NULL,
    code VARCHAR(50) UNIQUE NOT NULL,
    created_at TIMESTAMP WITH TIME ZONE DEFAULT CURRENT_TIMESTAMP,
    updated_at TIMESTAMP WITH TIME ZONE DEFAULT CURRENT_TIMESTAMP
);

-- 3. Tabla: options (Opciones/Permisos de Módulos)
CREATE TABLE options (
    id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
    name VARCHAR(100) NOT NULL,
    code VARCHAR(100) UNIQUE NOT NULL,
    route_path VARCHAR(255),
    module_id UUID NOT NULL,
    created_at TIMESTAMP WITH TIME ZONE DEFAULT CURRENT_TIMESTAMP,
    updated_at TIMESTAMP WITH TIME ZONE DEFAULT CURRENT_TIMESTAMP,
    CONSTRAINT fk_options_module FOREIGN KEY (module_id) REFERENCES modules(id) ON DELETE CASCADE
);

-- 4. Tabla: profile_options (Asociativa Perfiles - Opciones / Muchos a Muchos)
CREATE TABLE profile_options (
    profile_id UUID NOT NULL,
    option_id UUID NOT NULL,
    created_at TIMESTAMP WITH TIME ZONE DEFAULT CURRENT_TIMESTAMP,
    PRIMARY KEY (profile_id, option_id),
    CONSTRAINT fk_profile_options_profile FOREIGN KEY (profile_id) REFERENCES profiles(id) ON DELETE CASCADE,
    CONSTRAINT fk_profile_options_option FOREIGN KEY (option_id) REFERENCES options(id) ON DELETE CASCADE
);

-- 5. Tabla: users (Usuarios)
CREATE TABLE users (
    id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
    email VARCHAR(255) UNIQUE NOT NULL,
    password_hash VARCHAR(255) NOT NULL,
    profile_id UUID NOT NULL,
    is_active BOOLEAN NOT NULL DEFAULT TRUE,
    created_at TIMESTAMP WITH TIME ZONE DEFAULT CURRENT_TIMESTAMP,
    updated_at TIMESTAMP WITH TIME ZONE DEFAULT CURRENT_TIMESTAMP,
    CONSTRAINT fk_users_profile FOREIGN KEY (profile_id) REFERENCES profiles(id) ON DELETE RESTRICT
);

-- 6. Tabla: tickets (Tickets de Soporte)
CREATE TABLE tickets (
    id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
    title VARCHAR(200) NOT NULL,
    description TEXT NOT NULL,
    status ticket_status NOT NULL DEFAULT 'OPEN',
    priority ticket_priority NOT NULL DEFAULT 'LOW',
    creator_id UUID NOT NULL,
    created_at TIMESTAMP WITH TIME ZONE DEFAULT CURRENT_TIMESTAMP,
    updated_at TIMESTAMP WITH TIME ZONE DEFAULT CURRENT_TIMESTAMP,
    CONSTRAINT fk_tickets_creator FOREIGN KEY (creator_id) REFERENCES users(id) ON DELETE RESTRICT
);

-- 7. Tabla: comments (Comentarios del Ticket)
CREATE TABLE comments (
    id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
    ticket_id UUID NOT NULL,
    user_id UUID NOT NULL,
    content TEXT NOT NULL,
    created_at TIMESTAMP WITH TIME ZONE DEFAULT CURRENT_TIMESTAMP,
    updated_at TIMESTAMP WITH TIME ZONE DEFAULT CURRENT_TIMESTAMP,
    CONSTRAINT fk_comments_ticket FOREIGN KEY (ticket_id) REFERENCES tickets(id) ON DELETE CASCADE,
    CONSTRAINT fk_comments_user FOREIGN KEY (user_id) REFERENCES users(id) ON DELETE RESTRICT
);

-- 8. Tabla: assignments (Asignaciones de Agentes/Usuarios a Tickets)
CREATE TABLE assignments (
    id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
    ticket_id UUID NOT NULL,
    assignee_id UUID NOT NULL,
    assigned_by_id UUID,
    created_at TIMESTAMP WITH TIME ZONE DEFAULT CURRENT_TIMESTAMP,
    CONSTRAINT fk_assignments_ticket FOREIGN KEY (ticket_id) REFERENCES tickets(id) ON DELETE CASCADE,
    CONSTRAINT fk_assignments_assignee FOREIGN KEY (assignee_id) REFERENCES users(id) ON DELETE RESTRICT,
    CONSTRAINT fk_assignments_assigned_by FOREIGN KEY (assigned_by_id) REFERENCES users(id) ON DELETE SET NULL
);

-- ==========================================
-- Índices para Optimización de Consultas (Performance)
-- ==========================================

-- Índices en claves foráneas para optimizar JOINS y búsquedas referenciales
CREATE INDEX idx_options_module_id ON options(module_id);
CREATE INDEX idx_users_profile_id ON users(profile_id);
CREATE INDEX idx_tickets_creator_id ON tickets(creator_id);
CREATE INDEX idx_comments_ticket_id ON comments(ticket_id);
CREATE INDEX idx_comments_user_id ON comments(user_id);
CREATE INDEX idx_assignments_ticket_id ON assignments(ticket_id);
CREATE INDEX idx_assignments_assignee_id ON assignments(assignee_id);

-- Índices en campos de búsqueda, filtrado y ordenación común
CREATE INDEX idx_users_email ON users(email);
CREATE INDEX idx_tickets_status ON tickets(status);
CREATE INDEX idx_tickets_priority ON tickets(priority);
CREATE INDEX idx_tickets_created_at ON tickets(created_at);
