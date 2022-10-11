import { map, Observable } from 'rxjs';
import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { environment } from 'src/environments/environment';
import {
  SocialAuthService,
  GoogleLoginProvider,
  FacebookLoginProvider,
} from 'angularx-social-login';

const BACKEND_URL = environment.API_URL;

@Injectable({ providedIn: 'root' })
export class AuthService {
  constructor(
    private http: HttpClient,
    private _socialAuthService: SocialAuthService
  ) {}

  login(value: any): Observable<any> {
    return this.http
      .post<{
        message: string;
        token: string;
        return_url: string;
        user: any;
      }>(BACKEND_URL + 'login', value)
      .pipe(
        map((response) => ({
          token: response?.token,
          returnUrl: response?.return_url,
        }))
      );
  }

  logout(): Observable<any> {
    this._socialAuthService.signOut();
    return this.http.post<any>(BACKEND_URL + 'logout', {});
  }

  submitOTPAdmin(otp: string): Observable<any> {
    return this.http
      .post(BACKEND_URL + 'verifyOtp', { otp })
      .pipe(map((response) => response));
  }

  resendOTPAdmin() {
    return this.http.get<any>(BACKEND_URL + 'resendOtp');
  }

  register(value: any): Observable<any> {
    return this.http.post<any>(BACKEND_URL + 'registeration', value);
  }

  forgetPassword(email: string) {
    return this.http.post<any>(BACKEND_URL + 'send-email', { email });
  }

  resetPassword(value: any): Observable<any> {
    return this.http.post<any>(BACKEND_URL + 'reset-password', value);
  }

  confirmEmail(value: any): Observable<any> {
    return this.http.get<{ status_code: number }>(
      BACKEND_URL + `activate/${value.uid}/${value.token}/`
    );
  }

  verifyEmail(value: any): Observable<any> {
    const sendData = value;
    return this.http.post<any>(BACKEND_URL + 'verification', sendData);
  }

  resendEmailConfirm(email: string): Observable<any> {
    return this.http.post<any>(BACKEND_URL + 'verification/resend', { email });
  }

  uploadDocuments(data: any): Observable<any> {
    return this.http.post<any>(BACKEND_URL + 'teacher/upload-documents', data);
  }

  uploadSingleDocuments(data: any): Observable<any> {
    return this.http.post<any>(BACKEND_URL + 'teacher/upload-documents2', data);
  }

  registerUser(user: any) {
    return {
      ...user,
      first_name: user.firstName,
      last_name: user.lastName,
      mobile_number: user.mobileNumber,
    };
  }

  signInWithGoogle(): any {
    return this._socialAuthService.signIn(GoogleLoginProvider.PROVIDER_ID);
  }

  googleSignIn(data: any): Observable<any> {
    return this.http
      .post<any>(BACKEND_URL + 'google-signup', data)
      .pipe(map((response) => response?.token));
  }

  facebookSignIn(data: any): Observable<any> {
    return this.http
      .post<any>(BACKEND_URL + 'facebook-signup', data)
      .pipe(map((response) => response?.token));
  }

  signInWithFacebook() {
    return this._socialAuthService.signIn(FacebookLoginProvider.PROVIDER_ID);
  }

  validatePassword(data: any): Observable<any> {
    return this.http.post<any>(BACKEND_URL + 'validate-password', data);
  }

  submitInterviewRequest(data: any): Observable<any> {
    return this.http.post<any>(BACKEND_URL + 'interview-request', data);
  }

  changePassword(data: any): Observable<any> {
    const value = {
      current_password: data.oldPassword,
      new_password: data.password,
      confirm_password: data.confirmPassword,
    };

    return this.http.post<any>(BACKEND_URL + 'change-password', value);
  }

  changeEmail(data: any): Observable<any> {
    return this.http.post<any>(BACKEND_URL + 'change-email', data);
  }

  sendOTPForChangeEmail(data: any): Observable<any> {
    return this.http.post<any>(BACKEND_URL + 'submit-email-withotp', data);
  }

  sendTeacherAccount(data: any): Observable<any> {
    return this.http.post<any>(BACKEND_URL + 'teacher/complete-account', data);
  }

  getAllInterviewRequests() {
    return this.http.get<any>(BACKEND_URL + 'interview-requests');
  }

  getInterviewRequestDetails(id: string): Observable<any> {
    return this.http.get<any>(
      BACKEND_URL + `interview-requests/detail?id=${id}`
    );
  }

  getAdminDetails(id: string): Observable<any> {
    return this.http.get<any>(BACKEND_URL + `admin/${id}/profile`);
  }

  getStudentDetails(id: string): Observable<any> {
    return this.http.get<any>(BACKEND_URL + `student/${id}/profile`);
  }

  getTeacherDetails(id: string): Observable<any> {
    return this.http.get<any>(BACKEND_URL + `teacher/${id}/profile`);
  }

  inviteFriends(data: any): Observable<any> {
    return this.http.post<any>(BACKEND_URL + 'invite/friends', data);
  }
}
