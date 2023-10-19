import { Component } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { IRecipe } from 'src/app/models/Recipe';
import { RecipesService } from 'src/app/services/recipes.service';

@Component({
  selector: 'app-recipe-form',
  templateUrl: './recipe-form.component.html',
  styleUrls: ['./recipe-form.component.scss']
})
export class RecipeFormComponent {
  public recipe!: IRecipe;
  public recipeForm: FormGroup = new FormGroup({
    title: new FormControl('', Validators.required),
    body: new FormControl('', Validators.required),
    tags: new FormControl('', Validators.required),
    image: new FormControl('', Validators.required),
    timeCooking: new FormControl(0, Validators.required),
    ingredient: new FormControl(0, Validators.required),
    calories: new FormControl(0, Validators.required),
    fats: new FormControl(0, Validators.required),
    carbohydrates: new FormControl(0, Validators.required),
    belki: new FormControl(0, Validators.required),
    firstStep: new FormControl('', Validators.required),
    description: new FormControl('', Validators.required),
  });;

  constructor(private readonly recipesService: RecipesService) {
    this.recipesService.getRecipe(1).subscribe((recipe) => {
      this.recipe = recipe;
      console.log(recipe);
      console.log(this.recipe);
      this.recipeForm.patchValue({ 
        title: this.recipe.title,
        body: this.recipe.body,
        tags: this.recipe.tags,
        image: this.recipe.image,
        timeCooking: this.recipe.timeCooking,
        ingredient: this.recipe.additionalInformation?.ingredients[0],
        calories: this.recipe.foodValue?.calories,
        fats: this.recipe.foodValue?.fats,
        carbohydrates: this.recipe.foodValue?.carbohydrates,
        belki: this.recipe.foodValue?.belki,
        firstStep: this.recipe.additionalInformation?.details[0].title,
        description: this.recipe.additionalInformation?.details[0].body
      })
    });
  }

  // Create and initialize the form group
  initRecipeForm(recipe: IRecipe) {
    this.recipeForm = new FormGroup({
      title: new FormControl(recipe.title, Validators.required),
      body: new FormControl(recipe.body, Validators.required),
      tags: new FormControl(recipe.tags, Validators.required),
      image: new FormControl(recipe.image, Validators.required),
      timeCooking: new FormControl(recipe.timeCooking, Validators.required),
      foodValue: new FormGroup({
        calories: new FormControl(recipe.foodValue?.calories, Validators.required),
        fats: new FormControl(recipe.foodValue?.fats, Validators.required),
        carbohydrates: new FormControl(recipe.foodValue?.carbohydrates, Validators.required),
        belki: new FormControl(recipe.foodValue?.belki, Validators.required),
      }),
      additionalInformation: new FormGroup({
        ingredients: new FormControl(recipe.additionalInformation?.ingredients, Validators.required),
        details: new FormControl(recipe.additionalInformation?.details, Validators.required),
      }),
    });
  }
}

