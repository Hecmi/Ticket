import { Routes } from '@angular/router';
import { authGuard } from './core/guards/auth.guard';

export const routes: Routes = [
  {
    path: '',
    redirectTo: 'login',
    pathMatch: 'full'
  },
  {
    path: 'login',
    loadComponent: () => import('./features/auth/login/login.component').then(m => m.LoginComponent)
  },
  {
    path: 'register',
    loadComponent: () => import('./features/auth/register/register.component').then(m => m.RegisterComponent)
  },
  {
    path: 'tickets',
    canActivate: [authGuard],
    loadComponent: () => import('./features/tickets/tickets-list/tickets-list.component').then(m => m.TicketsListComponent)
  },
  {
    path: 'tickets/:id',
    canActivate: [authGuard],
    loadComponent: () => import('./features/tickets/ticket-detail/ticket-detail').then(m => m.TicketDetail)
  },
  {
    path: 'admin/permissions',
    canActivate: [authGuard],
    loadComponent: () => import('./features/admin/permissions-manager/permissions-manager').then(m => m.PermissionsManager)
  },
  {
    path: '**',
    redirectTo: 'login'
  }
];
