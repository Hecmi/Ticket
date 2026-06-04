import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';

export interface MockApiResponse<T> {
  status: string;
  data: T;
}

@Injectable({
  providedIn: 'root'
})
export class TicketService {
  private apiUrl = 'http://localhost:3000/api/v1/tickets';

  constructor(private http: HttpClient) { }

  getTickets(): Observable<MockApiResponse<any[]>> {
    return this.http.get<MockApiResponse<any[]>>(this.apiUrl);
  }

  getTicket(id: string): Observable<MockApiResponse<any>> {
    return this.http.get<MockApiResponse<any>>(`${this.apiUrl}/${id}`);
  }

  createTicket(payload: { title: string, description: string, priority: string }): Observable<MockApiResponse<any>> {
    return this.http.post<MockApiResponse<any>>(this.apiUrl, payload);
  }

  changeTicketStatus(id: string, payload: { status: string }): Observable<MockApiResponse<any>> {
    return this.http.put<MockApiResponse<any>>(`${this.apiUrl}/${id}/status`, payload);
  }

  changeTicketPriority(id: string, payload: { priority: string }): Observable<MockApiResponse<any>> {
    return this.http.put<MockApiResponse<any>>(`${this.apiUrl}/${id}/priority`, payload);
  }

  getComments(ticketId: string): Observable<MockApiResponse<any[]>> {
    return this.http.get<MockApiResponse<any[]>>(`${this.apiUrl}/${ticketId}/comments`);
  }

  addComment(ticketId: string, content: string): Observable<MockApiResponse<any>> {
    return this.http.post<MockApiResponse<any>>(`${this.apiUrl}/${ticketId}/comments`, { content });
  }

  getAssignments(ticketId: string): Observable<MockApiResponse<any[]>> {
    return this.http.get<MockApiResponse<any[]>>(`${this.apiUrl}/${ticketId}/assign`);
  }

  assignTicket(ticketId: string, assigneeId: string): Observable<MockApiResponse<any>> {
    return this.http.post<MockApiResponse<any>>(`${this.apiUrl}/${ticketId}/assign`, { assigneeId });
  }
}
