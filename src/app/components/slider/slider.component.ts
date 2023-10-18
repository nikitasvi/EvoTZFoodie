import { Component } from '@angular/core';
import { Plugin } from "@egjs/ngx-flicking";
import { AutoPlay } from "@egjs/flicking-plugins";
import { RecipesService } from 'src/app/services/recipes.service';
import { IRecipe } from 'src/app/models/Recipe';

@Component({
  selector: 'app-slider',
  templateUrl: './slider.component.html',
  styleUrls: ['./slider.component.scss']
})
export class SliderComponent {
  public plugins: Plugin[] = [new AutoPlay({ duration: 5000, direction: "NEXT", stopOnHover: false })];
  public recipes: IRecipe[] = [];

  constructor(private readonly recipeService: RecipesService) {
    this.recipeService.getRecipes().subscribe((recipes) => {
      this.recipes = recipes.filter((recipe) => recipe.favorite === true);;
    })
  }
}
