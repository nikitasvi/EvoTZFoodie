import { Component, OnInit } from '@angular/core';
import { Select, Store } from '@ngxs/store';
import { Observable, map, take } from 'rxjs';
import { IRecipe } from 'src/app/models/Recipe';
import { RecipesService } from 'src/app/services/recipes.service';
import { AddLike, RecipeState, UnlikePost } from 'src/app/states/like.state';

@Component({
  selector: 'app-main-page',
  templateUrl: './main-page.component.html',
  styleUrls: ['./main-page.component.scss']
})
export class MainPageComponent {
  public recipes: IRecipe[] = [];
  public favoriteRecipes: IRecipe[] = [];
  public bestRecipes: IRecipe[] = [];
  public recommendedRecipes: IRecipe[] = [];
  public whyUsPoints: IDetail[] = [];

  private randomRecipesIndexes: number[] = [];
  public showMoreButton = true;

  constructor(
    private readonly recipeService: RecipesService,
    private readonly store: Store) {
    this.recipeService.getRecipes().subscribe((recipes) => {
      this.recipes = recipes;
      this.favoriteRecipes = recipes.filter((recipe) => recipe.favorite === true);
      this.getRandomRecipes(this.bestRecipes, 3, this.randomRecipesIndexes);
      this.getRandomRecipes(this.recommendedRecipes, 4);
    })

    this.initPoints();
  }

  public loadMoreRecipes() {
    this.getRandomRecipes(this.bestRecipes, 6, this.randomRecipesIndexes);
    this.showMoreButton = false;
  }

  public getRandomRecipes(arr: IRecipe[], count: number, indexes: number[] = []): IRecipe[] {
    while (indexes.length < count) {
      const randomIndex = Math.floor(Math.random() * this.recipes.length);
      
      if (!indexes.includes(randomIndex)) {
        indexes.push(randomIndex);

        const randomRecipe = this.recipes[randomIndex];
        arr.push(randomRecipe);
      }
    }

    return arr;
  }

  private initPoints() {
    this.whyUsPoints = [
      {
        name: 'Проверенные рецепты',
        body: 'Вы можете найти множество проверенных рецептов, которые помогут вам приготовить вкусные и разнообразные блюда для всей семьи.'
      },
      {
        name: 'Для всех',
        body: 'Вы сможете найти легкие и вкусные блюда, которые понравятся и детям, и взрослым.'
      },
      {
        name: 'Огромное разнообразие',
        body: 'Разнообразие рецептов для всех порадует самых разносторонних гурманов'
      },
      {
        name: 'Храним рецепты для вас',
        body: 'Это отличный способ организовать и хранить свою коллекцию кулинарных рецептов. Вместо того, чтобы хранить бумажные копии или оставлять их в разных кулинарных книгах.'
      },
    ]
  }
}

export interface IDetail {
  name: string,
  body: string,
}