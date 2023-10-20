import { Injectable } from '@angular/core';
import {
  HttpRequest,
  HttpHandler,
  HttpEvent,
  HttpInterceptor,
} from '@angular/common/http';
import { Observable } from 'rxjs';
import { LoginService } from '../services/login.service';
import { JwtHelperService } from '@auth0/angular-jwt';
import { Router } from '@angular/router';

@Injectable()
export class TokenInterceptor implements HttpInterceptor {
  constructor(
    private readonly loginService: LoginService,
    private readonly router: Router
  ) {}

  intercept(
    request: HttpRequest<any>,
    next: HttpHandler
  ): Observable<HttpEvent<any>> {
    const token = localStorage.getItem('access_token');

    if (token) {
      if (this.isTokenExpired(token)) {
        // Если токен истек, вы можете выполнить логаут и перенаправить пользователя на страницу входа
        
        // логика из LoginService.logout, но там релоад страницы делаю, поэтому так
        // иначе на страницу с unauthorized не получится попасть
        this.loginService._isLoggedIn$.next(false);
        localStorage.removeItem('access_token');
        localStorage.removeItem('userId');
        localStorage.removeItem('role');
        localStorage.removeItem('fullName');
        localStorage.removeItem('username');

        this.router.navigate(['**'], {
          queryParams: { errorType: 'unauthorized' },
        });
      } else {
        request = request.clone({
          setHeaders: {
            Authorization: `Bearer ${token}`,
          },
        });
      }
    }
    return next.handle(request);
  }

  private isTokenExpired(token: string): boolean {
    const helper = new JwtHelperService();
    return helper.isTokenExpired(token);
  }
}
