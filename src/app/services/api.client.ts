import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class ApiClient {
    private apiUrl = 'https://ea-backend.wckz.space';

    constructor(private http: HttpClient) { }
  
    private buildUrl(endpoint: string): string {
      return `${this.apiUrl}/${endpoint}`;
    }
  
    private getDefaultHeaders(): HttpHeaders {
      // You can set default headers like authentication tokens here.
      const headers = new HttpHeaders({
        'Content-Type': 'application/json',
      });
      return headers;
    }
  
    public get<T>(endpoint: string, options?: { headers?: HttpHeaders }): Observable<T> {
      const url = this.buildUrl(endpoint);
      const headers = options?.headers || this.getDefaultHeaders();
      return this.http.get<T>(url, { headers });
    }
  
    public post<T>(endpoint: string, data: any, options?: { headers?: HttpHeaders }): Observable<T> {
      const url = this.buildUrl(endpoint);
      const headers = options?.headers || this.getDefaultHeaders();
      return this.http.post<T>(url, data, { headers });
    }
  
    public put<T>(endpoint: string, data: any, options?: { headers?: HttpHeaders }): Observable<T> {
      const url = this.buildUrl(endpoint);
      const headers = options?.headers || this.getDefaultHeaders();
      return this.http.put<T>(url, data, { headers });
    }
  
    public delete<T>(endpoint: string, options?: { headers?: HttpHeaders }): Observable<T> {
      const url = this.buildUrl(endpoint);
      const headers = options?.headers || this.getDefaultHeaders();
      return this.http.delete<T>(url, { headers });
    }
}