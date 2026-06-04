import { ComponentFixture, TestBed } from '@angular/core/testing';
import { TicketsListComponent } from './tickets-list.component';
import { TicketService } from '../../../core/services/ticket.service';
import { MatDialog } from '@angular/material/dialog';
import { of, throwError } from 'rxjs';

describe('TicketsListComponent', () => {
  let component: TicketsListComponent;
  let fixture: ComponentFixture<TicketsListComponent>;
  let ticketServiceSpy: any;
  let dialog: MatDialog;
  let dialogSpy: any;

  beforeEach(async () => {
    ticketServiceSpy = {
      getTickets: vi.fn().mockReturnValue(of({ data: [{ id: '1', status: 'OPEN', priority: 'LOW' }] })),
      createTicket: vi.fn().mockReturnValue(of({ data: { id: '2' } })),
      changeTicketStatus: vi.fn().mockReturnValue(of({ data: { status: 'CLOSED', updated_at: 'now' } }))
    };

    dialogSpy = {
      open: vi.fn()
    };

    await TestBed.configureTestingModule({
      imports: [TicketsListComponent],
      providers: [
        { provide: TicketService, useValue: ticketServiceSpy },
        
      ]
    }).compileComponents();

    fixture = TestBed.createComponent(TicketsListComponent);
    dialog = fixture.debugElement.injector.get(MatDialog);
    dialogSpy = { open: vi.spyOn(dialog, 'open') };
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create and load tickets', () => {
    expect(component).toBeTruthy();
    expect(ticketServiceSpy.getTickets).toHaveBeenCalled();
    expect(component.tickets.length).toBe(1);
    expect(component.isLoading).toBe(false);
  });

  it('should handle error when loading tickets', () => {
    ticketServiceSpy.getTickets.mockReturnValue(throwError(() => new Error('Error')));
    component.loadTickets();
    expect(component.isLoading).toBe(false);
  });

  it('should get priority color', () => {
    expect(component.getPriorityColor('CRITICAL')).toBe('warn');
    expect(component.getPriorityColor('HIGH')).toBe('accent');
    expect(component.getPriorityColor('MEDIUM')).toBe('primary');
    expect(component.getPriorityColor('LOW')).toBe('');
  });

  it('should handle create dialog close', () => {
    dialogSpy.open.mockReturnValue({ afterClosed: () => of({ title: 't' }) });
    component.openCreateDialog();
    expect(dialogSpy.open).toHaveBeenCalled();
    expect(ticketServiceSpy.createTicket).toHaveBeenCalled();
  });

  it('should handle confirm close dialog', () => {
    dialogSpy.open.mockReturnValue({ afterClosed: () => of(true) });
    const ticket = { id: '1', status: 'OPEN' };
    component.openCloseConfirmDialog(ticket);
    expect(dialogSpy.open).toHaveBeenCalled();
    expect(ticketServiceSpy.changeTicketStatus).toHaveBeenCalled();
    expect(ticket.status).toBe('CLOSED');
  });

  it('should handle priority change dialog', () => {
    dialogSpy.open.mockReturnValue({ afterClosed: () => of('HIGH') });
    const ticket = { id: '1', priority: 'LOW' };
    component.openPriorityDialog(ticket);
    expect(dialogSpy.open).toHaveBeenCalled();
    expect(ticket.priority).toBe('HIGH');
  });
});
