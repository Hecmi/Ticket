
import { Component, Inject } from '@angular/core';
import { MatDialogRef, MAT_DIALOG_DATA, MatDialogModule } from '@angular/material/dialog';
import { MatButtonModule } from '@angular/material/button';

@Component({
  selector: 'app-ticket-confirm-dialog',
  standalone: true,
  imports: [MatDialogModule, MatButtonModule],
  template: `
    <h2 mat-dialog-title>Confirm Action</h2>
    <mat-dialog-content>
      <p>Are you sure you want to close the ticket: <strong>{{data.title}}</strong>?</p>
      <p class="warning-text">This action cannot be undone.</p>
    </mat-dialog-content>
    <mat-dialog-actions align="end">
      <button mat-button mat-dialog-close>CANCEL</button>
      <button mat-flat-button color="warn" (click)="onConfirm()">CLOSE TICKET</button>
    </mat-dialog-actions>
  `,
  styles: [` .warning-text { color: #f44336; font-size: 14px; } `]
})
export class TicketConfirmDialogComponent {
  constructor(
    public dialogRef: MatDialogRef<TicketConfirmDialogComponent>,
    @Inject(MAT_DIALOG_DATA) public data: { title: string }
  ) {}
  onConfirm(): void { this.dialogRef.close(true); }
}
