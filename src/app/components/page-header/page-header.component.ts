import { Component, OnInit } from '@angular/core';
import { Observable } from 'rxjs';
import { Role, Auth } from 'src/app/models/Auth';
import { LoginService } from 'src/app/services/login.service';

@Component({
  selector: 'app-page-header',
  templateUrl: './page-header.component.html',
  styleUrls: ['./page-header.component.scss'],
})
export class PageHeaderComponent implements OnInit {
  public isLoggedIn$!: Observable<boolean>;
  public user: Auth | null = null;
  public isMenuToggled = false;

  constructor(public loginService: LoginService) {}

  public ngOnInit() {
    this.isLoggedIn$ = this.loginService.isLoggedIn$;
    this.isLoggedIn$.subscribe((isLoggedIn) => {
      if (isLoggedIn) {
        const id = Number(localStorage.getItem('id'));
        const role = localStorage.getItem('role') as Role;
        const fullName = localStorage.getItem('fullName');
        const userName = localStorage.getItem('username');

        if (fullName && userName) {
          this.user = new Auth(id, role, fullName, userName);
        } else {
          this.user = this.loginService.currentUser;
        }
      }
    });
  }

  public toggleMenu() {
    return (this.isMenuToggled = !this.isMenuToggled);
  }
}
