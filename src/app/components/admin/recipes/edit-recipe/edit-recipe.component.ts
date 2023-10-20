import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { IRecipe } from 'src/app/models/Recipe';
import { RecipesService } from 'src/app/services/recipes.service';

@Component({
  selector: 'app-edit-recipe',
  templateUrl: './edit-recipe.component.html',
  styleUrls: ['./edit-recipe.component.scss'],
})
export class EditRecipeComponent implements OnInit {
  public recipe: IRecipe | null = null;
  public id!: number;

  constructor(
    private readonly recipesService: RecipesService,
    private readonly route: ActivatedRoute
  ) {}

  ngOnInit(): void {
    this.route.paramMap.subscribe((params) => {
      this.id = Number(params.get('id'));
      if (this.id) {
        console.log('ID from route:', this.id);
      }
    });

    if (this.id) {
      this.recipesService.getRecipe(this.id).subscribe((recipe) => {
        this.recipe = recipe;
      });
    }
  }
}
