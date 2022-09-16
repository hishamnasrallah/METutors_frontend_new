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

  loadOrders(params: any): Observable<any> {
    return this.http.get<any>(`${this.baseUrl}admin/orders`, { params }).pipe(
      map((result) => ({
        orders: result?.orders?.data,
        total: result?.orders?.total,
      }))
    );
  }

  loadAdminCourses(params: any): Observable<any> {
    return this.http
      .get<any>(`${this.baseUrl}admin/all-courses`, { params })
      .pipe(
        map((result) => ({
          courses: result?.courses?.data,
          total: result?.courses?.total,
        }))
      );
  }

  loadRefundOrders(params: any): Observable<any> {
    return this.http
      .get<any>(`${this.baseUrl}admin/courses/refund`, { params })
      .pipe(
        map((result) => ({
          orders: result?.orders?.data,
          total: result?.orders?.total,
        }))
      );
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

  verifyCoursePayment(
    id: string,
    course_id: number,
    resource_path: string
  ): Observable<any> {
    return this.http.get<any>(`${this.baseUrl}payment/status`, {
      params: { id, course_id, resource_path },
    });
  }

  reTryPayment(course_id: number, redirect_url: string): Observable<any> {
    return this.http.post<any>(`${this.baseUrl}course/payment-retry`, {
      course_id,
      redirect_url,
    });
  }
}
