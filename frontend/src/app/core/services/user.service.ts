import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { MockApiResponse } from './ticket.service';

@Injectable({
  providedIn: 'root'
})
export class UserService {
  private apiUrl = 'http://localhost:3000/api/v1/users';

  constructor(private http: HttpClient) {}

  getUsers(): Observable<MockApiResponse<any[]>> {
    return this.http.get<MockApiResponse<any[]>>(this.apiUrl);
  }
}
