import { IRole } from '@models';
import { map, Observable } from 'rxjs';
import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { environment } from 'src/environments/environment';

const BACKEND_URL = environment.API_URL;

@Injectable({ providedIn: 'root' })
export class UsersService {
  constructor(private http: HttpClient) {}

  getUserLocation(): any {
    // @ts-ignore
    return dbip.getVisitor();
  }

  getRoles(): Observable<any> {
    return this.http.get<{ roles: IRole[] }>(BACKEND_URL + `roles`).pipe(
      map(response => {
        return response.roles.map(item => ({
          id: item?.id,
          name: item?.name,
          caption: item?.caption
        }));
      })
    );
  }

  changeLanguage(language: string): Observable<any> {
    return this.http.post(`${BACKEND_URL}user/language`, { language });
  }
}
