import { Component } from '@angular/core';
import { FormGroup } from '@angular/forms';
import { Observable } from 'rxjs';
import { IRecipe } from 'src/app/models/Recipe';
import { RecipesService } from 'src/app/services/recipes.service';

@Component({
  selector: 'app-edit-recipe',
  templateUrl: './edit-recipe.component.html',
  styleUrls: ['./edit-recipe.component.scss'],
})
export class EditRecipeComponent {
  public recipe: IRecipe | null = null;
  
  constructor(private readonly recipesService: RecipesService) {
    this.recipesService.getRecipe(1).subscribe((recipe) => {
      this.recipe = recipe;
    });
  }
}
