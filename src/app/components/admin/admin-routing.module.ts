import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { AdminPageComponent } from './admin-page/admin-page.component';
import { RecipeAdminComponent } from './recipes/recipe.component';
import { UsersComponent } from './users/users.component';
import { EditRecipeComponent } from './recipes/edit-recipe/edit-recipe.component';

const routes: Routes = [
  {
    path: '',
    component: AdminPageComponent,
    children: [
      { path: 'users', component: UsersComponent },
      { path: 'recipes', component: RecipeAdminComponent },
      { path: 'recipes/:id', component: EditRecipeComponent },
    ],
  },
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class AdminRoutingModule {}
