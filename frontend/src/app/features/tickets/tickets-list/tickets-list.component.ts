
import { Component, OnInit, ChangeDetectorRef } from '@angular/core';
import { RouterLink, Router } from '@angular/router';
import { CommonModule } from '@angular/common';
import { MatCardModule } from '@angular/material/card';
import { MatButtonModule } from '@angular/material/button';
import { MatIconModule } from '@angular/material/icon';
import { MatChipsModule } from '@angular/material/chips';
import { MatDialog, MatDialogModule } from '@angular/material/dialog';
import { TicketService } from '../../../core/services/ticket.service';
import { AuthService } from '../../../core/services/auth.service';
import { TicketCreateDialogComponent } from '../components/ticket-create-dialog/ticket-create-dialog.component';
import { TicketConfirmDialogComponent } from '../components/ticket-confirm-dialog/ticket-confirm-dialog.component';
import { TicketPriorityDialogComponent } from '../components/ticket-priority-dialog/ticket-priority-dialog.component';

@Component({
  selector: 'app-tickets-list',
  standalone: true,
  imports: [CommonModule, MatCardModule, MatButtonModule, MatIconModule, MatChipsModule, MatDialogModule, RouterLink],
  templateUrl: './tickets-list.component.html',
  styleUrls: ['./tickets-list.component.scss']
})
export class TicketsListComponent implements OnInit {
  tickets: any[] = [];
  isLoading = true;
  currentUser: any = null;

  constructor(
    private ticketService: TicketService, 
    private authService: AuthService,
    private router: Router,
    private dialog: MatDialog,
    private cdr: ChangeDetectorRef
  ) {
    if (typeof localStorage !== 'undefined') {
      const u = localStorage.getItem('user');
      if (u) this.currentUser = JSON.parse(u);
    }
  }

  ngOnInit(): void {
    this.loadTickets();
  }

  loadTickets() {
    this.isLoading = true;
    this.ticketService.getTickets().subscribe({
      next: (res: any) => {
        this.tickets = res.data;
        console.log('TICKETS LOADED:', this.tickets);
        this.isLoading = false;
        this.cdr.detectChanges();
      },
      error: () => {
        this.isLoading = false;
        this.cdr.detectChanges();
      }
    });
  }

  openCreateDialog() {
    const dialogRef = this.dialog.open(TicketCreateDialogComponent, { width: '500px', maxWidth: '95vw' });
    
    dialogRef.afterClosed().subscribe(result => {
      if (result) {
        let user_id = '';
        if (typeof localStorage !== 'undefined') {
          const userStr = localStorage.getItem('user');
          if (userStr) {
            const user = JSON.parse(userStr);
            user_id = user.id;
          }
        }
        
        result.user_id = user_id;
        this.ticketService.createTicket(result).subscribe((res: any) => {
          this.tickets.unshift(res.data);
          this.cdr.detectChanges();
        });
      }
    });
  }

  openCloseConfirmDialog(ticket: any) {
    const dialogRef = this.dialog.open(TicketConfirmDialogComponent, {
      width: '400px',
      data: { title: ticket.title }
    });

    dialogRef.afterClosed().subscribe(confirmed => {
      if (confirmed) {
        this.ticketService.changeTicketStatus(ticket.id, { status: 'CLOSED' }).subscribe((res: any) => {
          ticket.status = res.data.status;
          ticket.updatedAt = res.data.updatedAt;
          this.cdr.detectChanges();
        });
      }
    });
  }

  openPriorityDialog(ticket: any) {
    const dialogRef = this.dialog.open(TicketPriorityDialogComponent, {
      width: '350px',
      data: { currentPriority: ticket.priority }
    });

    dialogRef.afterClosed().subscribe(newPriority => {
      if (newPriority && newPriority !== ticket.priority) {
        this.ticketService.changeTicketPriority(ticket.id, { priority: newPriority }).subscribe((res: any) => {
          ticket.priority = res.data.priority;
          ticket.updatedAt = res.data.updatedAt;
          this.cdr.detectChanges();
        });
      }
    });
  }

  getPriorityColor(priority: string): string {
    switch (priority) {
      case 'CRITICAL': return 'warn';
      case 'HIGH': return 'accent';
      case 'MEDIUM': return 'primary';
      default: return '';
    }
  }

  isAdmin(): boolean {
    return this.currentUser?.profile?.name === 'ADMIN';
  }

  logout(): void {
    this.authService.logout();
    this.router.navigate(['/login']);
  }
}
