import { Component, OnInit, ChangeDetectorRef } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ActivatedRoute, Router, RouterLink } from '@angular/router';
import { ReactiveFormsModule, FormBuilder, FormGroup, Validators } from '@angular/forms';
import { MatCardModule } from '@angular/material/card';
import { MatButtonModule } from '@angular/material/button';
import { MatIconModule } from '@angular/material/icon';
import { MatInputModule } from '@angular/material/input';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatSelectModule } from '@angular/material/select';
import { TicketService } from '../../../core/services/ticket.service';
import { UserService } from '../../../core/services/user.service';
import { MatChipsModule } from '@angular/material/chips';

@Component({
  selector: 'app-ticket-detail',
  standalone: true,
  imports: [
    CommonModule, ReactiveFormsModule, MatCardModule, MatButtonModule, 
    MatIconModule, MatInputModule, MatFormFieldModule, MatSelectModule, MatChipsModule, RouterLink
  ],
  templateUrl: './ticket-detail.html',
  styleUrls: ['./ticket-detail.scss']
})
export class TicketDetail implements OnInit {
  ticketId!: string;
  ticket: any = null;
  comments: any[] = [];
  assignments: any[] = [];
  users: any[] = [];
  isLoading = true;

  commentForm: FormGroup;
  assignForm: FormGroup;

  currentUser: any = null;

  constructor(
    private route: ActivatedRoute,
    private router: Router,
    private ticketService: TicketService,
    private userService: UserService,
    private fb: FormBuilder,
    private cdr: ChangeDetectorRef
  ) {
    this.commentForm = this.fb.group({
      content: ['', Validators.required]
    });

    this.assignForm = this.fb.group({
      assigneeId: ['', Validators.required]
    });

    if (typeof localStorage !== 'undefined') {
      const u = localStorage.getItem('user');
      if (u) this.currentUser = JSON.parse(u);
    }
  }

  ngOnInit(): void {
    this.ticketId = this.route.snapshot.paramMap.get('id') || '';
    if (!this.ticketId) {
      this.router.navigate(['/tickets']);
      return;
    }
    this.loadData();
  }

  loadData() {
    this.isLoading = true;
    
    // Cargar detalles del ticket
    this.ticketService.getTicket(this.ticketId).subscribe({
      next: (res: any) => {
        this.ticket = res.data;
        this.cdr.detectChanges();
      }
    });

    // Cargar comentarios
    this.ticketService.getComments(this.ticketId).subscribe({
      next: (res: any) => {
        this.comments = res.data;
        this.cdr.detectChanges();
      }
    });

    // Cargar asignaciones
    this.ticketService.getAssignments(this.ticketId).subscribe({
      next: (res: any) => {
        this.assignments = res.data;
        this.cdr.detectChanges();
      }
    });

    // Cargar usuarios para el dropdown (solo si es admin o soporte, pero asumimos q el endpoint filtra)
    if (this.canAssign()) {
      this.userService.getUsers().subscribe({
        next: (res: any) => {
          this.users = res.data;
          this.cdr.detectChanges();
        }
      });
    }

    setTimeout(() => {
      this.isLoading = false;
      this.cdr.detectChanges();
    }, 500);
  }

  addComment() {
    if (this.commentForm.valid) {
      const { content } = this.commentForm.value;
      this.ticketService.addComment(this.ticketId, content).subscribe({
        next: (res: any) => {
          this.comments.push(res.data);
          this.commentForm.reset();
          this.cdr.detectChanges();
        }
      });
    }
  }

  assignTicket() {
    if (this.assignForm.valid) {
      const { assigneeId } = this.assignForm.value;
      this.ticketService.assignTicket(this.ticketId, assigneeId).subscribe({
        next: (res: any) => {
          this.assignments.push(res.data);
          this.assignForm.reset();
          this.cdr.detectChanges();
        }
      });
    }
  }

  canAssign(): boolean {
    if (!this.currentUser) return false;
    const pName = this.currentUser.profile?.name;
    return pName === 'ADMIN' || pName === 'SOPORTE';
  }
}
