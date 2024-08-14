import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable, throwError } from 'rxjs';
import { catchError,   
 map } from 'rxjs/operators';
 import bycrypt from 'bcryptjs'

import { IChangePasswordRequest } from '../../interfaces/change-password.interface';
import { IUser } from '../../interfaces/users.interface';

import { environment } from '../../../../../environments/environment';

@Injectable({
  providedIn: 'root'
})
export class ChangePasswordService {

  constructor(private http: HttpClient) { }

  changePassword(userId: string, changePasswordRequest: IChangePasswordRequest): Observable<IUser> {
    const url = `${environment.api_dev}/change-password/${userId}`;
    return this.http.put<IUser>(url, changePasswordRequest)
      .pipe(
        catchError(this.handleError)
      );
  }  

  requestPasswordReset(email: string): Observable<any> { 
    const url = `${environment.api_dev}/users/password-reset`;
    return this.http.post(url, { email })
      .pipe(
        catchError(this.handleError)
      );
  }

  private handleError(error: any): Observable<never> {
    console.error(error);
    return throwError(error);
  }
}
