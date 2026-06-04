<<<<<<< HEAD
# Sistema de Gestión de Tickets

Este proyecto es una aplicación Fullstack desarrollada como prueba técnica, enfocada en la robustez, buenas prácticas de desarrollo (Clean Architecture). Permite la creación, seguimiento y asignación de tickets de soporte, e incluye un sistema completo de Control de Acceso Basado en Roles (RBAC).

## Tecnologías y Herramientas

- **Frontend:** Angular 21 (Zoneless, Standalone Components), Angular Material, RxJS, y Vitest/Jasmine para Testing.
- **Backend:** Node.js, Express, Arquitectura Limpia (Controllers, Services), JWT para Autenticación, encriptación Bcrypt.
- **Base de Datos:** PostgreSQL y Prisma ORM.

---

## Características Principales

1. **Gestión de Tickets:** Creación, cambio de prioridad, cierre de tickets, adición de comentarios (bitácora) y asignación de responsables.
2. **Sistema RBAC Integrado:** Administración dinámica de Perfiles (ADMIN, SOPORTE, CLIENTE) y Permisos.
3. **Autenticación Segura:** Sistema de login y registro usando JSON Web Tokens (JWT).
4. **Diseño Premium:** Interfaz de usuario "Glassmorphism" con diseño oscuro, responsiva y fluida, usando alineación W3C estandarizada.
5. **Seeding Automático:** La base de datos crea de forma inteligente y automática los roles, permisos y el usuario Administrador base al iniciar la API.

---

## Requisitos previos

- [Node.js](https://nodejs.org/) (v18 o superior)
- [PostgreSQL](https://www.postgresql.org/) (Corriendo localmente en el puerto 5432 o en un contenedor Docker)
- [Angular CLI](https://angular.dev/) (Opcional, se puede usar npm localmente)

---

## Configuración del backend y base de datos

1. Navega a la carpeta del backend:
   ```bash
   cd backend
   ```
2. Instala las dependencias:
   ```bash
   npm install
   ```
3. Configura el archivo `.env` en la raíz de la carpeta `backend`:
   ```env
   PORT=3000
   DATABASE_URL="postgresql://usuario:contraseña@localhost:5432/tickets_db?schema=public"
   JWT_SECRET="tu_secreto_super_seguro"
   ```
4. Aplica las migraciones de Prisma para construir el esquema de la base de datos:
   ```bash
   npx prisma migrate dev --name init
   ```
5. Inicia el servidor backend en modo desarrollo:
   ```bash
   npm run dev
   ```
   **Nota Automática:** Al levantar el servidor (`app.ts`), se ejecutará automáticamente el script de *Seeding*. Esto creará los roles (ADMIN, SOPORTE, CLIENTE), asignará los módulos correspondientes y creará al usuario administrador por defecto.

### Credenciales por Defecto (Administrador)
- **Email:** `admin@viamatica.com`
- **Contraseña:** `admin123`

---

## Configuración del Frontend

1. Abre una nueva terminal y navega a la carpeta del frontend:
   ```bash
   cd frontend
   ```
2. Instala las dependencias:
   ```bash
   npm install
   ```
3. Ejecuta el servidor de desarrollo local de Angular (Vite):
   ```bash
   npm start
   # Levantará por defecto en el puerto asignado (ej. http://localhost:4200 o http://localhost:4201)
   ```
4. Navega a la URL mostrada en tu terminal (usualmente `http://localhost:4201`) para interactuar con la aplicación. Utiliza las credenciales de administrador base para empezar.

---

## Testing y Cobertura (Coverage)

La aplicación cuenta con una suite completa de pruebas unitarias automatizadas para garantizar la confiabilidad.

Para ejecutar los tests en el **Frontend**:
```bash
cd frontend
npm test
```
*Los tests se ejecutan utilizando el motor nativo de Angular, el cual provee resultados ultrarrápidos aprovechando el ecosistema Vitest/Jasmine configurado sin Zone.js.*

Para generar el reporte de **Cobertura de Código** (>80%):
```bash
cd frontend
npm run test -- --coverage
```