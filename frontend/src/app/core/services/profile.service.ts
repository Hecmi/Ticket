import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class ProfileService {
  private apiUrl = 'http://localhost:3000/api/v1/profiles';

  constructor(private http: HttpClient) {}

  getPublicProfiles(): Observable<any> {
    return this.http.get<any>(`${this.apiUrl}/public`);
  }

  getProfiles(): Observable<any> {
    return this.http.get<any>(this.apiUrl);
  }

  updateProfileOptions(id: string, optionIds: string[]): Observable<any> {
    return this.http.put<any>(`${this.apiUrl}/${id}`, { optionIds });
  }
}
