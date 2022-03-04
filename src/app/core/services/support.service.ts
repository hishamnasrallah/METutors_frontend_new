import { HttpClient, HttpErrorResponse } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { environment } from 'src/environments/environment';
import { catchError, map } from 'rxjs/operators';
import { Observable, throwError } from 'rxjs';
import { IFAQ, IFAQTopics, ITicket } from '../models';

@Injectable({ providedIn: 'root' })
export class SupportService {
  baseUrl = environment.API_URL;

  constructor(private http: HttpClient) {}

  fetchListFaq(param: { title?: string; topic?: number }): Observable<any> {
    let params: { title?: string; topic?: number } = {};

    if (param.title) {
      params.title = param.title;
    }
    if (param.topic) {
      params.topic = param.topic;
    }

    return this.http
      .get<{ faqs: IFAQ[] }>(`${this.baseUrl}faqs`, { params })
      .pipe(map((response) => response.faqs))
      .pipe(catchError(this.errorHandler));
  }

  fetchFaqTopics(): Observable<any> {
    return this.http
      .get<{ faq_topics: IFAQTopics[] }>(this.baseUrl + 'faq-topics')
      .pipe(
        map((response) => {
          return response.faq_topics.map((item) => ({
            id: item.id,
            name: item.name,
          }));
        })
      )
      .pipe(catchError(this.errorHandler));
  }

  fetchListTickets(): Observable<any> {
    return this.http.get<{ results: ITicket[] }>(`${this.baseUrl}ticket/`).pipe(
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
      .post(`${this.baseUrl}ticket/`, formData)
      .pipe(catchError(this.errorHandler));
  }

  getTicketDetailsById(id: string): Observable<any> {
    return this.http
      .get(`${this.baseUrl}ticket/detail/${id}/`)
      .pipe(
        map((response) => {
          return new ITicket(false, response);
        })
      )
      .pipe(catchError(this.errorHandler));
  }

  submitMessage(value: any): Observable<any> {
    return this.http
      .post(`${this.baseUrl}ticket/reply/`, value)
      .pipe(catchError(this.errorHandler));
  }

  errorHandler(error: HttpErrorResponse) {
    return throwError(error);
  }
}
