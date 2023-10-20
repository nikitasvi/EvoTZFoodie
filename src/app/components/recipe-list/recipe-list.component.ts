import { Component } from '@angular/core';
import { Meta } from '@angular/platform-browser';
import { IRecipe } from 'src/app/models/Recipe';
import { RecipesService } from 'src/app/services/recipes.service';

@Component({
  selector: 'app-recipe-list',
  templateUrl: './recipe-list.component.html',
  styleUrls: ['./recipe-list.component.scss'],
})
export class RecipeListComponent {
  public recipes: IRecipe[] = [];

  constructor(
    private readonly recipeService: RecipesService,
    private readonly meta: Meta
  ) {
    this.recipeService.getRecipes().subscribe((recipes) => {
      this.recipes = recipes;

      this.meta.addTags([
        { name: 'og:name', content: 'Foodie: Главная' },
        {
          name: 'og:description',
          content: 'Сборник кулинарных рецептов, для всей семьи',
        },
      ]);
    });
  }
}
