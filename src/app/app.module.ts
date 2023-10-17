import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { PageHeaderComponent } from './components/page-header/page-header.component';
import { PageFooterComponent } from './components/page-footer/page-footer.component';
import { SharedCommonModule } from './shared/shared.module';
import { RegistrationComponent } from './components/registration/registration.component';
import { HTTP_INTERCEPTORS, HttpClientModule } from '@angular/common/http';
import { MainPageComponent } from './components/main-page/main-page.component';
import { LoginComponent } from './components/login/login.component';
import { ReactiveFormsModule } from '@angular/forms';
import { LoginService } from './services/login.service';
import { TitleCasePipe } from './pipes/titlecase.pipe';
import { RolePipe } from './pipes/role.pipe';
import { TokenInterceptor } from './interceptors/token.interceptor';
import { AdminPageComponent } from './components/admin/admin-page/admin-page.component';
import { UsersComponent } from './components/admin/users/users.component';
import { RecipeComponent } from './components/admin/recipes/recipe.component';
import { ApiClient } from './services/api.client';
import { UsersService } from './services/users.service';
import { RecipesService } from './services/recipes.service';
import { RecipeFormComponent } from './components/recipe-form/recipe-form.component';
import { EditRecipeComponent } from './components/admin/recipes/edit-recipe/edit-recipe.component';
import { SliderComponent } from './components/slider/slider.component';
import { NgxFlickingModule } from '@egjs/ngx-flicking';

@NgModule({
  declarations: [
    AppComponent,
    PageHeaderComponent,
    PageFooterComponent,
    RegistrationComponent,
    MainPageComponent,
    LoginComponent,
    TitleCasePipe,
    RolePipe,
    UsersComponent,
    AdminPageComponent,
    RecipeComponent,
    RecipeFormComponent,
    EditRecipeComponent,
    SliderComponent,
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    SharedCommonModule,
    HttpClientModule,
    ReactiveFormsModule,
    NgxFlickingModule,
  ],
  providers: [
    ApiClient,
    UsersService,
    LoginService,
    RecipesService,
    {
      provide: HTTP_INTERCEPTORS,
      useClass: TokenInterceptor,
      multi: true,
    },
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
