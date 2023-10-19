import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { RegistrationComponent } from './components/registration/registration.component';
import { MainPageComponent } from './components/main-page/main-page.component';
import { LoginComponent } from './components/login/login.component';
import { RecipeListComponent } from './components/recipe-list/recipe-list.component';
import { ErrorPageComponent } from './components/error-page/error-page.component';

const routes: Routes = [
  { path: '', component: MainPageComponent },
  { path: 'register', component: RegistrationComponent },
  { path: 'auth', component: LoginComponent },
  { path: 'recipe', component: RecipeListComponent },
  { path: 'admin', loadChildren: () => import('./components/admin/admin-routing.module').then(m => m.AdminRoutingModule) },
  { path: '**', component: ErrorPageComponent },
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
