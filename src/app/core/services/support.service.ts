import { HttpClient, HttpErrorResponse } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { environment } from 'src/environments/environment';
import { catchError, map } from 'rxjs/operators';
import { Observable, throwError } from 'rxjs';
import { IFAQ, ITicket } from '../models';

@Injectable()
export class SupportService {
  mainLink = environment.API_URL + 'support/';

  constructor(private http: HttpClient) {}

  fetchListFaq(questionType = 'ALL'): Observable<any> {
    let query = `?question_type=${questionType}`;
    if (questionType === 'ALL') query = '';

    return this.http
      .get<{ results: IFAQ[] }>(this.mainLink + 'faq/' + query)
      .pipe(catchError(this.errorHandler));
  }

  fetchListTickets(): Observable<any> {
    return this.http
      .get<{ results: ITicket[] }>(`${this.mainLink}ticket/`)
      .pipe(
        map((response) => {
          return response.results.map((item) => new ITicket(false, item));
        })
      );
  }

  createTicket(value: any): Observable<any> {
    const formData = new FormData();
    formData.append('type', value.type);
    formData.append('title', value.title);
    formData.append('description', value.description);
    if (value.file) formData.append('attached_file', value.file);

    return this.http
      .post(`${this.mainLink}ticket/`, formData)
      .pipe(catchError(this.errorHandler));
  }

  getTicketDetailsById(id: number): Observable<any> {
    return this.http
      .get(`${this.mainLink}ticket/detail/${id}/`)
      .pipe(
        map((response) => {
          return new ITicket(false, response);
        })
      )
      .pipe(catchError(this.errorHandler));
  }

  submitMessage(value: any): Observable<any> {
    return this.http
      .post(`${this.mainLink}ticket/reply/`, value)
      .pipe(catchError(this.errorHandler));
  }

  errorHandler(error: HttpErrorResponse) {
    return throwError(error);
  }
}
