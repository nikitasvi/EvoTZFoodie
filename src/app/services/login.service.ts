import { Injectable } from '@angular/core';
import { BehaviorSubject, tap } from 'rxjs';
import { Auth } from '../models/Auth';
import { ApiClient } from './api.client';
import { HttpResponse } from '@angular/common/http';
import { UsersService } from './users.service';
import { IUser } from '../models/User';

@Injectable({
  providedIn: 'root',
})
export class LoginService {
  public _isLoggedIn$ = new BehaviorSubject<boolean>(false);
  public isLoggedIn$ = this._isLoggedIn$.asObservable();
  public currentUser: Auth | null = null;

  constructor(private readonly apiClient: ApiClient) {
    const token = localStorage.getItem('access_token');
    this._isLoggedIn$.next(!!token);
  }

  public login(username: string | null, password: string | null) {
    const response = this.apiClient.post('users/login', { username, password });

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

  public logout() {
    localStorage.removeItem('userId');
    localStorage.removeItem('role');
    localStorage.removeItem('fullName');
    localStorage.removeItem('username');
    localStorage.removeItem('access_token');
  
    this._isLoggedIn$.next(false)
    this.currentUser = null;
    window.location.reload();
  }

  public register(email: string | null, password: string | null) {
    return this.apiClient.post('users/register', { email, password });
  }
}


