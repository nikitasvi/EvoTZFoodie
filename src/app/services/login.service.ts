import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { BehaviorSubject, tap } from 'rxjs';
import { Auth } from '../models/Auth';

const apiRoot = 'https://ea-backend.wckz.space';

@Injectable({
  providedIn: 'root',
})
export class LoginService {
  public _isLoggedIn$ = new BehaviorSubject<boolean>(false);
  public isLoggedIn$ = this._isLoggedIn$.asObservable();
  public currentUser!: Auth;

  constructor(private readonly http: HttpClient) {
    const token = localStorage.getItem('access_token');
    this._isLoggedIn$.next(!!token);
  }

  public login(username: string | null, password: string | null) {
    const response = this.http.post(`${apiRoot}/users/login`, { username, password });

    return response.pipe(
      tap((response: any) => {
        this.currentUser = new Auth(
          response.id,
          response.role,
          response.fullname,
          response.username
        )

        this._isLoggedIn$.next(true);

        localStorage.setItem('userId', this.currentUser.id.toString());
        localStorage.setItem('role', this.currentUser.role);
        localStorage.setItem('fullName', this.currentUser.fullName);
        localStorage.setItem('username', this.currentUser.userName);
        localStorage.setItem('access_token', response.access_token);
      })
    );
  }
}


