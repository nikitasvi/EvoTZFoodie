import { Component } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { LoginService } from 'src/app/services/login.service';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss'],
})
export class LoginComponent {
  public isSubmitted = false;
  public loginForm = new FormGroup({
    username: new FormControl('', Validators.required),
    password: new FormControl('', Validators.required),
  });

  constructor(
    private readonly router: Router,
    private readonly loginService: LoginService
  ) {}

  public submitForm() {
    if (this.loginForm.invalid) {
      this.isSubmitted = true;
      return;
    }

    const username = this.loginForm.controls.username.value;
    const password = this.loginForm.controls.password.value;

    this.loginService.login(username, password).subscribe((response) => {
      this.router.navigate(['/']);
    });
  }
}
