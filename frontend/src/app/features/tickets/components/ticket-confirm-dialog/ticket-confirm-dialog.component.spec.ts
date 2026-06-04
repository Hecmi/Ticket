import { ComponentFixture, TestBed } from '@angular/core/testing';
import { TicketConfirmDialogComponent } from './ticket-confirm-dialog.component';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';

describe('TicketConfirmDialogComponent', () => {
  let component: TicketConfirmDialogComponent;
  let fixture: ComponentFixture<TicketConfirmDialogComponent>;
  let dialogRefSpy: any;

  beforeEach(async () => {
    dialogRefSpy = { close: vi.fn() } as any;

    await TestBed.configureTestingModule({
      imports: [TicketConfirmDialogComponent],
      providers: [
        { provide: MatDialogRef, useValue: dialogRefSpy },
        { provide: MAT_DIALOG_DATA, useValue: { title: 'Test Ticket' } }
      ]
    }).compileComponents();

    fixture = TestBed.createComponent(TicketConfirmDialogComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('should close dialog with true on confirm', () => {
    component.onConfirm();
    expect(dialogRefSpy.close).toHaveBeenCalledWith(true);
  });
});
