import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { RegistrationComponent } from './components/registration/registration.component';
import { MainPageComponent } from './components/main-page/main-page.component';
import { LoginComponent } from './components/login/login.component';

const routes: Routes = [
  { path: '', component: MainPageComponent},
  { path: 'register', component: RegistrationComponent },
  { path: 'auth', component: LoginComponent},
  { path: 'admin', loadChildren: () => import('./components/admin/admin-routing.module').then(m => m.AdminRoutingModule) }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
