import { Component } from '@angular/core';
import { IRecipe } from 'src/app/models/Recipe';
import { RecipesService } from 'src/app/services/recipes.service';

@Component({
  selector: 'app-recipe-list',
  templateUrl: './recipe-list.component.html',
  styleUrls: ['./recipe-list.component.scss']
})
export class RecipeListComponent {
  public recipes: IRecipe[] = [];

  constructor(private readonly recipeService: RecipesService) {
    this.recipeService.getRecipes().subscribe((recipes) => {
      this.recipes = recipes;
    })
  }
}
