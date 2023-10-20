import { Component, Input, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { ActivatedRoute } from '@angular/router';
import { Notify } from 'notiflix';
import { IRecipe } from 'src/app/models/Recipe';
import { RecipesService } from 'src/app/services/recipes.service';

@Component({
  selector: 'app-recipe-form',
  templateUrl: './recipe-form.component.html',
  styleUrls: ['./recipe-form.component.scss'],
})
export class RecipeFormComponent implements OnInit {
  @Input() isEditMode!: boolean;

  public recipe!: IRecipe;
  public recipeForm: FormGroup = new FormGroup({
    title: new FormControl('', Validators.required),
    body: new FormControl('', Validators.required),
    tags: new FormControl('', Validators.required),
    image: new FormControl('', Validators.required),
    timeCooking: new FormControl(0, Validators.required),
    ingredient: new FormControl('', Validators.required),
    calories: new FormControl(0, Validators.required),
    fats: new FormControl(0, Validators.required),
    carbohydrates: new FormControl(0, Validators.required),
    belki: new FormControl(0, Validators.required),
    firstStep: new FormControl('', Validators.required),
    description: new FormControl('', Validators.required),
  });

  constructor(
    private readonly recipesService: RecipesService,
    private route: ActivatedRoute
  ) {}

  public ngOnInit(): void {
    let id;
    this.route.paramMap.subscribe((params) => {
      id = params.get('id');
      if (id) {
        // Now, you can use the 'id' in your component as needed
        console.log('ID from route:', id);
      }
    });

    if (this.isEditMode && id) {
      this.recipesService.getRecipe(id).subscribe((recipe) => {
        this.recipe = recipe;

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
          description: this.recipe.additionalInformation?.details[0].body,
        });
      });
    }
  }

  // Create a function to convert the form data to an IRecipe object
  public createRecipeFromForm(form: FormGroup): IRecipe {
    const formValue = form.value;

    const recipe: IRecipe = {
      id: this.recipe.id || 100, // длина массива рецептов + 1, 100 заглушка
      title: formValue.title,
      tags: formValue.tags,
      user:
        {
          id: this.recipe?.user.id,
          name: this.recipe?.user.name,
          date: this.recipe?.user.date,
          image: this.recipe?.user.image,
        } || [],
      image: formValue.image,
      body: formValue.body,
      timeCooking: formValue.timeCooking,
      favorite: this.recipe?.favorite || false,

      foodValue: {
        calories: formValue.calories,
        fats: formValue.fats,
        carbohydrates: formValue.carbohydrates,
        belki: formValue.belki,
      },
      comments: this.recipe?.comments || [],
      additionalInformation: {
        ingredients: this.recipe?.additionalInformation?.ingredients || [],
        details: this.recipe?.additionalInformation?.details || [],
      },
    };

    return recipe;
  }

  public update() {
    if (this.recipeForm.valid) {
      const recipe = this.createRecipeFromForm(this.recipeForm);

      this.recipesService.updateRecipe(this.recipe.id, recipe).subscribe(
        (response) => {
          console.log('Recipe updated successfully:', response);
          Notify.success('Рецепт успешно обновлен!');
          javascript: history.back();
        },
        (error) => {
          console.error('Error updating recipe:', error);
        }
      );
    }
  }

  public create() {
    if (this.recipeForm.valid) {
      const recipe = this.createRecipeFromForm(this.recipeForm);

      this.recipesService.createRecipe(recipe).subscribe(
        (response) => {
          console.log('Recipe created successfully:', response);
          Notify.success('Рецепт успешно создан!');
          javascript: history.back();
        },
        (error) => {
          console.error('Error updating recipe:', error);
        }
      );
    }
  }
}
