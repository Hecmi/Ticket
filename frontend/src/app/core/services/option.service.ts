import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { MockApiResponse } from './ticket.service';

@Injectable({
  providedIn: 'root'
})
export class OptionService {
  private apiUrl = 'http://localhost:3000/api/v1/options';

  constructor(private http: HttpClient) {}

  getOptions(): Observable<MockApiResponse<any[]>> {
    return this.http.get<MockApiResponse<any[]>>(this.apiUrl);
  }
}
