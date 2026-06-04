import { TestBed } from '@angular/core/testing';
import { HttpTestingController, provideHttpClientTesting } from '@angular/common/http/testing';
import { provideHttpClient } from '@angular/common/http';
import { TicketService } from './ticket.service';

describe('TicketService', () => {
  let service: TicketService;
  let httpMock: HttpTestingController;

  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [
        provideHttpClient(),
        provideHttpClientTesting()
      ]
    });
    service = TestBed.inject(TicketService);
    httpMock = TestBed.inject(HttpTestingController);
  });

  afterEach(() => {
    httpMock.verify();
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });

  it('should fetch tickets', () => {
    const mockResponse = { status: 'success', data: [{ id: '1', title: 'Test' }] };

    service.getTickets().subscribe(res => {
      expect(res.data.length).toBe(1);
      expect(res.data[0].title).toBe('Test');
    });

    const req = httpMock.expectOne('http://localhost:3000/api/v1/tickets');
    expect(req.request.method).toBe('GET');
    req.flush(mockResponse);
  });

  it('should create a ticket', () => {
    const mockResponse = { status: 'success', data: { id: '2', title: 'New' } };

    service.createTicket({ title: 'New', description: 'Desc', priority: 'HIGH' }).subscribe(res => {
      expect(res.data.id).toBe('2');
    });

    const req = httpMock.expectOne('http://localhost:3000/api/v1/tickets');
    expect(req.request.method).toBe('POST');
    expect(req.request.body).toEqual({ title: 'New', description: 'Desc', priority: 'HIGH' });
    req.flush(mockResponse);
  });

  it('should change ticket status', () => {
    const mockResponse = { status: 'success', data: { id: '1', status: 'CLOSED' } };

    service.changeTicketStatus('1', { status: 'CLOSED' }).subscribe(res => {
      expect(res.data.status).toBe('CLOSED');
    });

    const req = httpMock.expectOne('http://localhost:3000/api/v1/tickets/1/status');
    expect(req.request.method).toBe('PUT');
    expect(req.request.body).toEqual({ status: 'CLOSED' });
    req.flush(mockResponse);
  });

  it('should change ticket priority', () => {
    const mockResponse = { status: 'success', data: { id: '1', priority: 'HIGH' } };

    service.changeTicketPriority('1', { priority: 'HIGH' }).subscribe(res => {
      expect(res.data.priority).toBe('HIGH');
    });

    const req = httpMock.expectOne('http://localhost:3000/api/v1/tickets/1/priority');
    expect(req.request.method).toBe('PUT');
    expect(req.request.body).toEqual({ priority: 'HIGH' });
    req.flush(mockResponse);
  });
});
