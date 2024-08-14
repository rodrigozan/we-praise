import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable, of } from 'rxjs';
import { catchError, map } from 'rxjs/operators';
import { Router } from '@angular/router';

import { environment } from '../../../../../environments/environment';

import { ILogin } from '../../interfaces/login.interface'; 
import { StorageService } from '../../../../Services/storage/storage.service'

@Injectable({
  providedIn: 'root'
})
export class AuthService {

  private baseUrl = environment.api_dev;

  constructor(private router: Router, private http: HttpClient, private storageService: StorageService) {}

  login(credentials: ILogin): Observable<any> {
    return this.http.post<any>(`${this.baseUrl}/auth`, credentials)
      .pipe(
        map(response => {
          this.storageService.set('token', response.token);
          this.storageService.set('role', response.role);
          this.storageService.set('id', response.id);
          return response;
        }),
        catchError(error => {
          console.error('Error logging in:', error.message);
          return of(null);
        })
      );
  }

  isLoggedIn(): boolean {
    return !!this.storageService.get('token');
  }

  logout(): void {
    this.storageService.remove('token');
    this.router.navigate(['/login'])
  }
}
