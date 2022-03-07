import { Observable } from 'rxjs';
import { Injectable } from '@angular/core';
import { environment } from 'src/environments/environment';
import { HttpClient } from '@angular/common/http';

@Injectable({
  providedIn: 'root',
})
export class StudentsService {
  baseUrl = environment.API_URL;

  constructor(private http: HttpClient) {}

  loadTickets(): Observable<any> {
    return this.http.get<any>(`${this.baseUrl}my_tickets`);
  }
}
