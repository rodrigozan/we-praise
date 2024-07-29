import { inject } from '@angular/core';
import { HttpRequest, HttpHandlerFn, HttpInterceptorFn, HttpEvent } from '@angular/common/http';
import { Observable } from 'rxjs';
import { StorageService } from '../Services/storage/storage.service';

export const authInterceptor: HttpInterceptorFn = (request: HttpRequest<any>, next: HttpHandlerFn): Observable<HttpEvent<any>> => {
  const storageService = inject(StorageService);
  const token = storageService.get('token');

  if (token) {
    request = request.clone({
      setHeaders: {
        Authorization: `Bearer ${token}`
      }
    });
  }

  return next(request);
};
