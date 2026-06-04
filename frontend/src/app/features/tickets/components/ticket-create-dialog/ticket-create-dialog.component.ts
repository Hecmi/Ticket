
import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ReactiveFormsModule, FormBuilder, FormGroup, Validators } from '@angular/forms';
import { MatDialogRef, MatDialogModule } from '@angular/material/dialog';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { MatSelectModule } from '@angular/material/select';
import { MatButtonModule } from '@angular/material/button';

@Component({
  selector: 'app-ticket-create-dialog',
  standalone: true,
  imports: [CommonModule, ReactiveFormsModule, MatDialogModule, MatFormFieldModule, MatInputModule, MatSelectModule, MatButtonModule],
  template: `
    <h2 mat-dialog-title>Create New Ticket</h2>
    <mat-dialog-content>
      <form [formGroup]="form" class="dialog-form">
        <mat-form-field appearance="outline" class="full-width">
          <mat-label>Title</mat-label>
          <input matInput formControlName="title" placeholder="Brief description of the issue">
          <mat-error *ngIf="form.get('title')?.hasError('required')">Title is required</mat-error>
        </mat-form-field>
        
        <mat-form-field appearance="outline" class="full-width">
          <mat-label>Description</mat-label>
          <textarea matInput formControlName="description" rows="4" placeholder="Detailed explanation..."></textarea>
          <mat-error *ngIf="form.get('description')?.hasError('required')">Description is required</mat-error>
        </mat-form-field>
        
        <mat-form-field appearance="outline" class="full-width">
          <mat-label>Priority</mat-label>
          <mat-select formControlName="priority">
            <mat-option value="LOW">Low</mat-option>
            <mat-option value="MEDIUM">Medium</mat-option>
            <mat-option value="HIGH">High</mat-option>
            <mat-option value="CRITICAL">Critical</mat-option>
          </mat-select>
          <mat-error *ngIf="form.get('priority')?.hasError('required')">Priority is required</mat-error>
        </mat-form-field>
      </form>
    </mat-dialog-content>
    <mat-dialog-actions align="end">
      <button mat-button mat-dialog-close>CANCEL</button>
      <button mat-flat-button color="primary" [disabled]="form.invalid" (click)="onSubmit()">CREATE</button>
    </mat-dialog-actions>
  `,
  styles: [`
    .dialog-form { display: flex; flex-direction: column; gap: 16px; margin-top: 16px; min-width: 400px; }
    .full-width { width: 100%; }
    @media (max-width: 600px) { .dialog-form { min-width: 100%; } }
  `]
})
export class TicketCreateDialogComponent {
  form: FormGroup;
  constructor(private fb: FormBuilder, private dialogRef: MatDialogRef<TicketCreateDialogComponent>) {
    this.form = this.fb.group({
      title: ['', Validators.required],
      description: ['', Validators.required],
      priority: ['LOW', Validators.required]
    });
  }
  onSubmit() {
    if (this.form.valid) this.dialogRef.close(this.form.value);
  }
}
