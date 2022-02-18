import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { environment } from 'src/environments/environment';
import { Observable } from 'rxjs';

const BACKEND_URL = environment.API_URL;

@Injectable({ providedIn: 'root' })
export class UsersService {
  constructor(private http: HttpClient) {}

  getUserLocation(): any {
    // @ts-ignore
    return dbip.getVisitor();
  }

  getRoles(): Observable<any> {
    return this.http.get<any>(BACKEND_URL + `roles`);
  }
}
