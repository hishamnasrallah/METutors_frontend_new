import { Store } from '@ngrx/store';
import { map } from 'rxjs/operators';
import { Injectable } from '@angular/core';
import camelcaseKeys from 'camelcase-keys';
import { Observable, throwError } from 'rxjs';
import { HttpClient, HttpEventType, HttpResponse } from '@angular/common/http';

import * as fromCore from '@metutor/core/state';
import { environment } from 'src/environments/environment';

@Injectable({
  providedIn: 'root',
})
export class UploadService {
  uploadedFiles: any[] = [];
  fileUploadProgress: any[] = [];

  baseUrl = environment.API_URL;

  uploadFile(files: any): void {
    files.forEach((file: any, index: number) => {
      this.fileUploadProgress[index] = {
        progress: 0,
        responseType: 0,
        fileName: file.name,
      };

      const formData = new FormData();

      formData.append('file', file);

      this.onUploadFile(formData).subscribe((event) => {
        if (event.type === HttpEventType.UploadProgress) {
          this.fileUploadProgress[index] = {
            ...this.fileUploadProgress[index],
            progress: Math.round((100 * event.loaded) / event.total),
          };
        } else if (event.type === HttpEventType.Response) {
          this.uploadedFiles = event?.body;
          this.fileUploadProgress[index] = {
            ...this.fileUploadProgress[index],
            responseType: event.type,
          };
        }

        this._store.dispatch(
          fromCore.loadUploadFileProgress({
            uploadProgress: [...this.fileUploadProgress],
          })
        );

        this._store.dispatch(
          fromCore.loadUploadedFiles({
            files: this.uploadedFiles,
          })
        );
      });
    });
  }

  onUploadFile(files: any): Observable<any> {
    return this._http
      .post<HttpResponse<any>>(`${this.baseUrl}upload`, files, {
        reportProgress: true,
        observe: 'events',
      })
      .pipe(map((response) => camelcaseKeys(response, { deep: true })));
  }

  constructor(private _http: HttpClient, private _store: Store<any>) {}
}
