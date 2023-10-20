import { Component } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { Notify } from 'notiflix';
import { LoginService } from 'src/app/services/login.service';

@Component({
  selector: 'app-registration',
  templateUrl: './registration.component.html',
  styleUrls: ['./registration.component.scss'],
})
export class RegistrationComponent {
  public isSubmitted = false;
  public registrationForm = new FormGroup({
    login: new FormControl('', Validators.required),
    password: new FormControl('', Validators.required),
  });

  constructor(
    private readonly loginService: LoginService,
    private readonly router: Router
  ) {}

  public submitForm() {
    if (this.registrationForm.invalid) {
      this.isSubmitted = true;
      return;
    }

    const login = this.registrationForm.controls.login.value;
    const password = this.registrationForm.controls.password.value;

    this.loginService.register(login, password).subscribe(() => {
      Notify.success('Вы успешно зарегистрированы');
      this.router.navigate(['/']);
    });
  }
}
