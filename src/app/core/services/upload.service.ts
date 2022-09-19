import { Store } from '@ngrx/store';
import { map } from 'rxjs/operators';
import { Injectable } from '@angular/core';
import camelcaseKeys from 'camelcase-keys';
import { Observable, of, Subscription } from 'rxjs';
import { HttpClient, HttpEventType, HttpResponse } from '@angular/common/http';

import { formatBytes } from '@config';
import * as fromCore from '@metutor/core/state';
import { environment } from 'src/environments/environment';

@Injectable({
  providedIn: 'root',
})
export class UploadService {
  uploadedFiles: any[] = [];
  fileUploadProgress: any[] = [];
  fileUploadStream$: Subscription;

  baseUrl = environment.API_URL;

  uploadFile(files: any): void {
    console.log('files', files);
    files.forEach((file: any, index: number) => {
      this.fileUploadProgress[index] = {
        url: '',
        id: null,
        progress: 0,
        skip: file?.skip,
        responseType: 0,
        fileSize: file.size,
        fileName: file.name,
      };

      const formData = new FormData();

      formData.append('file', file);
      formData.append('size', formatBytes(file.size));

      this.fileUploadStream$ = this.onUploadFile(formData).subscribe(
        (event) => {
          if (event.type === HttpEventType.UploadProgress) {
            this.fileUploadProgress[index] = {
              ...this.fileUploadProgress[index],
              progress: Math.round((100 * event.loaded) / event.total),
            };
          } else if (event.type === HttpEventType.Response) {
            const file = event?.body?.file;
            this.uploadedFiles = file;
            this.fileUploadProgress[index] = {
              ...this.fileUploadProgress[index],
              responseType: event.type,
              id: file?.length ? file[0]?.id : null,
              url: file?.length ? file[0]?.url : '',
            };

            if (!this.fileUploadProgress[index]?.skip) {
              this._store.dispatch(
                fromCore.loadUploadedFiles({
                  files: this.uploadedFiles,
                })
              );
            }
          }

          this._store.dispatch(
            fromCore.loadUploadFileProgress({
              uploadProgress: [...this.fileUploadProgress],
            })
          );
        }
      );
    });
  }

  onUploadFile(file: any): Observable<any> {
    return this._http
      .post<HttpResponse<any>>(`${this.baseUrl}upload`, file, {
        reportProgress: true,
        observe: 'events',
      })
      .pipe(map((response) => camelcaseKeys(response, { deep: true })));
  }

  deleteUploadedFile(id: number): Observable<any> {
    return this._http.delete<any>(`${this.baseUrl}file/${id}`);
  }

  changeAvatar(file: File): Observable<any> {
    const formData = new FormData();
    formData.append('avatar', file);

    return this._http.post<any>(`${this.baseUrl}change-avatar`, formData);
  }

  changeCover(file: File): Observable<any> {
    const formData = new FormData();
    formData.append('cover_img', file);

    return this._http.post<any>(`${this.baseUrl}change-cover`, formData);
  }

  cancelUploadStream(): Observable<any> {
    this.fileUploadStream$.unsubscribe();

    return of({});
  }

  constructor(private _http: HttpClient, private _store: Store<any>) {}
}
