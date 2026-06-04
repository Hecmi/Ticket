export enum TicketStatus {
  OPEN = 'OPEN',
  IN_PROGRESS = 'IN_PROGRESS',
  RESOLVED = 'RESOLVED',
  CLOSED = 'CLOSED',
}

export enum TicketPriority {
  LOW = 'LOW',
  MEDIUM = 'MEDIUM',
  HIGH = 'HIGH',
  CRITICAL = 'CRITICAL',
}

export interface Profile {
  id: string;
  name: string;
  description?: string | null;
  createdAt: string;
  updatedAt: string;
}

export interface Module {
  id: string;
  name: string;
  code: string;
  createdAt: string;
  updatedAt: string;
}

export interface Option {
  id: string;
  name: string;
  code: string;
  routePath?: string | null;
  moduleId: string;
  createdAt: string;
  updatedAt: string;
  module?: Module;
}

export interface User {
  id: string;
  email: string;
  profileId: string;
  isActive: boolean;
  createdAt: string;
  updatedAt: string;
  // Relaciones opcionales que el API podría incluir
  profile?: Profile;
}

export interface Ticket {
  id: string;
  title: string;
  description: string;
  status: TicketStatus;
  priority: TicketPriority;
  creatorId: string;
  createdAt: string;
  updatedAt: string;
  // Relaciones opcionales
  creator?: User;
}

export interface Comment {
  id: string;
  ticketId: string;
  userId: string;
  content: string;
  createdAt: string;
  updatedAt: string;
  // Relaciones opcionales
  user?: User;
}

export interface Assignment {
  id: string;
  ticketId: string;
  assigneeId: string;
  assignedById?: string | null;
  createdAt: string;
  // Relaciones opcionales
  assignee?: User;
  assignedBy?: User;
}
