
import { Component, Inject } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ReactiveFormsModule, FormBuilder, FormGroup, Validators } from '@angular/forms';
import { MatDialogRef, MAT_DIALOG_DATA, MatDialogModule } from '@angular/material/dialog';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatSelectModule } from '@angular/material/select';
import { MatButtonModule } from '@angular/material/button';

@Component({
  selector: 'app-ticket-priority-dialog',
  standalone: true,
  imports: [CommonModule, ReactiveFormsModule, MatDialogModule, MatFormFieldModule, MatSelectModule, MatButtonModule],
  template: `
    <h2 mat-dialog-title>Change Priority</h2>
    <mat-dialog-content>
      <form [formGroup]="form" class="dialog-form">
        <mat-form-field appearance="outline" class="full-width">
          <mat-label>New Priority</mat-label>
          <mat-select formControlName="priority">
            <mat-option value="LOW">Low</mat-option>
            <mat-option value="MEDIUM">Medium</mat-option>
            <mat-option value="HIGH">High</mat-option>
            <mat-option value="CRITICAL">Critical</mat-option>
          </mat-select>
        </mat-form-field>
      </form>
    </mat-dialog-content>
    <mat-dialog-actions align="end">
      <button mat-button mat-dialog-close>CANCEL</button>
      <button mat-flat-button color="primary" [disabled]="form.invalid || form.value.priority === data.currentPriority" (click)="onSubmit()">CHANGE</button>
    </mat-dialog-actions>
  `,
  styles: [` .dialog-form { margin-top: 16px; min-width: 300px; } .full-width { width: 100%; } `]
})
export class TicketPriorityDialogComponent {
  form: FormGroup;
  constructor(
    private fb: FormBuilder,
    public dialogRef: MatDialogRef<TicketPriorityDialogComponent>,
    @Inject(MAT_DIALOG_DATA) public data: { currentPriority: string }
  ) {
    this.form = this.fb.group({ priority: [data.currentPriority, Validators.required] });
  }
  onSubmit(): void { if (this.form.valid) this.dialogRef.close(this.form.value.priority); }
}
