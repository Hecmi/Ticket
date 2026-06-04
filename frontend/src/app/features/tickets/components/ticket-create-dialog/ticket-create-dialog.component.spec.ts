import { ComponentFixture, TestBed } from '@angular/core/testing';
import { TicketCreateDialogComponent } from './ticket-create-dialog.component';
import { MatDialogRef } from '@angular/material/dialog';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';

describe('TicketCreateDialogComponent', () => {
  let component: TicketCreateDialogComponent;
  let fixture: ComponentFixture<TicketCreateDialogComponent>;
  let dialogRefSpy: any;

  beforeEach(async () => {
    dialogRefSpy = { close: vi.fn() } as any;

    await TestBed.configureTestingModule({
      imports: [TicketCreateDialogComponent, BrowserAnimationsModule],
      providers: [
        { provide: MatDialogRef, useValue: dialogRefSpy }
      ]
    }).compileComponents();

    fixture = TestBed.createComponent(TicketCreateDialogComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('should close dialog with form value on submit', () => {
    component.form.setValue({ title: 'T', description: 'D', priority: 'HIGH' });
    component.onSubmit();
    expect(dialogRefSpy.close).toHaveBeenCalledWith({ title: 'T', description: 'D', priority: 'HIGH' });
  });

  it('should not close dialog if invalid', () => {
    component.form.setValue({ title: '', description: '', priority: '' });
    component.onSubmit();
    expect(dialogRefSpy.close).not.toHaveBeenCalled();
  });
});
