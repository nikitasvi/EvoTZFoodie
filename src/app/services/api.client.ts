import {
  HttpClient,
  HttpHeaders,
  HttpErrorResponse,
} from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Router } from '@angular/router';
import { Observable, throwError } from 'rxjs';
import { catchError } from 'rxjs/operators';

@Injectable({
  providedIn: 'root',
})
export class ApiClient {
  private apiUrl = 'https://ea-backend.wckz.space';

  constructor(
    private readonly http: HttpClient,
    private readonly router: Router
  ) {}

  private buildUrl(endpoint: string): string {
    return `${this.apiUrl}/${endpoint}`;
  }

  private getDefaultHeaders(): HttpHeaders {
    const headers = new HttpHeaders({
      'Content-Type': 'application/json',
    });
    return headers;
  }

  public get<T>(
    endpoint: string,
    options?: { headers?: HttpHeaders }
  ): Observable<T> {
    const url = this.buildUrl(endpoint);
    const headers = options?.headers || this.getDefaultHeaders();
    return this.http
      .get<T>(url, { headers })
      .pipe(catchError(this.handleError));
  }

  public post<T>(
    endpoint: string,
    data: any,
    options?: { headers?: HttpHeaders }
  ): Observable<T> {
    const url = this.buildUrl(endpoint);
    const headers = options?.headers || this.getDefaultHeaders();
    return this.http
      .post<T>(url, data, { headers })
      .pipe(catchError(this.handleError));
  }

  public put<T>(
    endpoint: string,
    data: any,
    options?: { headers?: HttpHeaders }
  ): Observable<T> {
    const url = this.buildUrl(endpoint);
    const headers = options?.headers || this.getDefaultHeaders();
    return this.http
      .put<T>(url, data, { headers })
      .pipe(catchError(this.handleError));
  }

  public patch<T>(
    endpoint: string,
    data: any,
    options?: { headers?: HttpHeaders }
  ): Observable<T> {
    const url = this.buildUrl(endpoint);
    const headers = options?.headers || this.getDefaultHeaders();
    return this.http
      .patch<T>(url, data, { headers })
      .pipe(catchError(this.handleError));
  }
  
  public delete<T>(
    endpoint: string,
    options?: { headers?: HttpHeaders }
  ): Observable<T> {
    const url = this.buildUrl(endpoint);
    const headers = options?.headers || this.getDefaultHeaders();
    return this.http
      .delete<T>(url, { headers })
      .pipe(catchError(this.handleError));
  }

  private handleError = (error: HttpErrorResponse) => {
    if (error.status === 401) {
      this.router.navigate(['**'], {
        queryParams: { errorType: 'unauthorized' },
      });
    }
    return throwError('Something bad happened; please try again later.');
  };
}
