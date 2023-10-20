import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { RegistrationComponent } from './components/registration/registration.component';
import { MainPageComponent } from './components/main-page/main-page.component';
import { LoginComponent } from './components/login/login.component';
import { RecipeListComponent } from './components/recipe-list/recipe-list.component';
import { ErrorPageComponent } from './components/error-page/error-page.component';
import { RecipeComponent } from './components/recipe/recipe.component';
import { AuthGuard } from './guards/auth.guard';

const routes: Routes = [
  { path: '', component: MainPageComponent },
  { path: 'register', component: RegistrationComponent },
  { path: 'auth', component: LoginComponent },
  { path: 'recipe', component: RecipeListComponent },
  { path: 'recipe/:id', component: RecipeComponent },
  { 
    path: 'admin', 
    loadChildren: () => import('./components/admin/admin-routing.module').then(m => m.AdminRoutingModule),
    canActivate: [AuthGuard] 
  },
  { path: '**', component: ErrorPageComponent },
];

@NgModule({
  imports: [RouterModule.forRoot(routes, { scrollPositionRestoration: 'enabled' })],
  exports: [RouterModule]
})
export class AppRoutingModule { }
