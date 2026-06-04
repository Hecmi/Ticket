import { ComponentFixture, TestBed } from '@angular/core/testing';
import { TicketPriorityDialogComponent } from './ticket-priority-dialog.component';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';

describe('TicketPriorityDialogComponent', () => {
  let component: TicketPriorityDialogComponent;
  let fixture: ComponentFixture<TicketPriorityDialogComponent>;
  let dialogRefSpy: any;

  beforeEach(async () => {
    dialogRefSpy = { close: vi.fn() } as any;

    await TestBed.configureTestingModule({
      imports: [TicketPriorityDialogComponent, BrowserAnimationsModule],
      providers: [
        { provide: MatDialogRef, useValue: dialogRefSpy },
        { provide: MAT_DIALOG_DATA, useValue: { currentPriority: 'LOW' } }
      ]
    }).compileComponents();

    fixture = TestBed.createComponent(TicketPriorityDialogComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('should initialize with current priority', () => {
    expect(component.form.get('priority')?.value).toBe('LOW');
  });

  it('should close with new priority on submit', () => {
    component.form.get('priority')?.setValue('HIGH');
    component.onSubmit();
    expect(dialogRefSpy.close).toHaveBeenCalledWith('HIGH');
  });
});
