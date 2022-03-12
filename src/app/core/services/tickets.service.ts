import { catchError, map, Observable, throwError } from 'rxjs';
import { Injectable } from '@angular/core';
import { environment } from 'src/environments/environment';
import { HttpClient, HttpErrorResponse } from '@angular/common/http';
import { ITicket } from '../models';

@Injectable({
  providedIn: 'root',
})
export class TicketsService {
  baseUrl = environment.API_URL;

  constructor(private http: HttpClient) {}

  loadTickets(): Observable<any> {
    return this.http
      .get<{ tickets: ITicket[] }>(`${this.baseUrl}my-tickets`)
      .pipe(
        map((response) =>
          response.tickets.map((ticket) => new ITicket(false, ticket))
        )
      )
      .pipe(catchError(this.errorHandler));
  }

  loadTicket(id: string): Observable<any> {
    return this.http
      .get<{ ticket: ITicket }>(`${this.baseUrl}tickets/${id}`)
      .pipe(map((response) => new ITicket(false, response.ticket)))
      .pipe(catchError(this.errorHandler));
  }

  createTicket(ticket: any): Observable<any> {
    const formData = new FormData();

    formData.append('category', ticket.category);
    formData.append('priority', ticket.priority);
    formData.append('title', ticket.title);
    formData.append('message', ticket.message);

    if (ticket.file) formData.append('file', ticket.file);

    return this.http
      .post<{ ticket: ITicket }>(`${this.baseUrl}create-ticket`, formData)
      .pipe(map((response) => new ITicket(false, response.ticket)))
      .pipe(catchError(this.errorHandler));
  }

  submitTicketComment(comment: string, ticketId?: number): Observable<any> {
    return this.http
      .post(`${this.baseUrl}comment`, {
        ticket_id: ticketId,
        comment,
      })
      .pipe(catchError(this.errorHandler));
  }

  errorHandler(error: HttpErrorResponse) {
    return throwError(error);
  }
}
