import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';

import { environment } from '../../../../../environments/environment';

@Injectable({
  providedIn: 'root'
})
export class ApiService {

  private apiBase = environment.api_dev

  constructor(private http: HttpClient) {}

  get<T>(route: string): Observable<T[]> {
    return this.http.get<T[]>(`${this.apiBase}/${route}`);
  }

  search<T>(route: string): Observable<T[]> {
    const url = `${this.apiBase}/${route}`;
    return this.http.get<T[]>(url);
  }
}
