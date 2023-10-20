import { Injectable } from '@angular/core';
import {
  ActivatedRouteSnapshot,
  CanActivate,
  Router,
  RouterStateSnapshot,
} from '@angular/router';
import { UsersService } from '../services/users.service';
import { IUser } from '../models/User';

@Injectable({
  providedIn: 'root',
})
export class AuthGuard implements CanActivate {
  private user!: IUser;
  constructor(
    private readonly usersService: UsersService,
    private readonly router: Router
  ) {
    const userId = localStorage.getItem('userId');

    if (userId) {
      this.usersService.getUser(Number(userId)).subscribe((user) => {
        this.user = user;
      });
    }
  }

  canActivate(
    route: ActivatedRouteSnapshot,
    state: RouterStateSnapshot
  ): boolean {
    if (this.user?.role === 'admin') {
      return true;
    }

    this.router.navigateByUrl('');
    return false;
  }
}
