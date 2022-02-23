import { HttpClient, HttpErrorResponse } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable, throwError } from 'rxjs';
import { catchError } from 'rxjs/operators';
import { environment } from 'src/environments/environment';

@Injectable()
export class ContactService {
  mainLink = environment.API_URL + 'contact-us/';

  constructor(private http: HttpClient) {}

  createContact(value: any): Observable<any> {
    const formData = new FormData();
    formData.append('name', value.name);
    formData.append('email', value.email);
    formData.append('subject', value.subject);
    formData.append('message', value.message);

    if (value.file) formData.append('files', value.file);

    if (value.companyName) formData.append('company', value.companyName);

    return this.http
      .post(this.mainLink, formData)
      .pipe(catchError(this.errorHandler));
  }

  errorHandler(error: HttpErrorResponse) {
    return throwError(error);
  }
}
