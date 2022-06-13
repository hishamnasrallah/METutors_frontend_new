import { map, Observable } from 'rxjs';
import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';

import { environment } from 'src/environments/environment';

@Injectable({
  providedIn: 'root',
})
export class FinanceService {
  baseUrl = environment.API_URL;

  constructor(private http: HttpClient) {}

  loadOrders(): Observable<any> {
    return this.http
      .get<any>(`${this.baseUrl}admin/orders`)
      .pipe(map((result) => result?.orders));
  }

  loadRefundOrders(): Observable<any> {
    return this.http
      .get<any>(`${this.baseUrl}admin/courses/refund`)
      .pipe(map((result) => result?.orders));
  }

  loadRefundDetail(courseId: number): Observable<any> {
    return this.http
      .get<any>(`${this.baseUrl}admin/course/${courseId}/refund/detail`)
      .pipe(map((result) => result?.refund_detail));
  }

  refundCourse(courseId: number): Observable<any> {
    return this.http.post<any>(
      `${this.baseUrl}admin/course/${courseId}/refund`,
      {}
    );
  }
}
