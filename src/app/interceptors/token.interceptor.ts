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

@Injectable()
export class TokenInterceptor implements HttpInterceptor {
  constructor(private loginService: LoginService) {}

  intercept(
    request: HttpRequest<any>,
    next: HttpHandler
  ): Observable<HttpEvent<any>> {
    // Получить текущий JWT-токен из AuthService
    const token = localStorage.getItem('access_token');

    // Проверить, что токен существует и не истек
    if (token) {
      if (this.isTokenExpired(token)) {
        // Если токен истек, вы можете выполнить логаут и перенаправить пользователя на страницу входа
        this.loginService._isLoggedIn$.next(false);

        localStorage.removeItem('access_token');
        localStorage.removeItem('userId');
        localStorage.removeItem('role');
        localStorage.removeItem('fullName');
        localStorage.removeItem('username');
      } else {
        // Если токен действителен, добавьте его к заголовкам запроса
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
