import { Component } from '@angular/core';
import { TabType } from '../admin-page/admin-page.component';
import { IRecipe } from 'src/app/models/Recipe';
import { RecipesService } from 'src/app/services/recipes.service';

@Component({
  selector: 'app-recipes',
  templateUrl: './recipe.component.html',
  styleUrls: ['./recipe.component.scss', '../_admin.scss']
})
export class RecipeAdminComponent {
  public currentTab: TabType = 'recipes';
  public recipes: IRecipe[] = [];

  constructor(private readonly recipeService: RecipesService) {
    this.recipeService.getRecipes().subscribe((recipes) => this.recipes = recipes);
  }

  public switchTab(tab: TabType) {
    this.currentTab = tab;
  }
}
