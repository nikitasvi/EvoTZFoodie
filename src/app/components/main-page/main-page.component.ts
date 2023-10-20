import { Component } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Meta } from '@angular/platform-browser';
import { Store } from '@ngxs/store';
import { Notify } from 'notiflix';
import { IDetail, IRecipe } from 'src/app/models/Recipe';
import { RecipesService } from 'src/app/services/recipes.service';

@Component({
  selector: 'app-main-page',
  templateUrl: './main-page.component.html',
  styleUrls: ['./main-page.component.scss'],
})
export class MainPageComponent {
  public recipes: IRecipe[] = [];
  public favoriteRecipes: IRecipe[] = [];
  public bestRecipes: IRecipe[] = [];
  public recommendedRecipes: IRecipe[] = [];
  public whyUsPoints: IDetail[] = [];

  private randomRecipesIndexes: number[] = [];
  public showMoreButton = true;
  public emailForm: FormGroup;

  // можно кидать инфу об плашке внизу в локал сторадж и по айди юзера и значению тру/фолс смотреть, но уже не успел
  public isNotifyClosed = false;

  constructor(
    private readonly recipeService: RecipesService,
    private readonly formBuilder: FormBuilder,
    private readonly meta: Meta
  ) {
    this.meta.addTags([
      { name: 'og:name', content: 'Foodie: Главная' },
      {
        name: 'og:description',
        content: 'Сборник кулинарных рецептов, для всей семьи',
      },
    ]);

    this.recipeService.getRecipes().subscribe((recipes) => {
      this.recipes = recipes;
      this.favoriteRecipes = recipes.filter(
        (recipe) => recipe.favorite === true
      );
      this.getRandomRecipes(this.bestRecipes, 3, this.randomRecipesIndexes);
      this.getRandomRecipes(this.recommendedRecipes, 4);
    });

    this.initPoints();

    this.emailForm = this.formBuilder.group({
      email: ['', [Validators.required, Validators.email]],
    });
  }

  public loadMoreRecipes() {
    this.getRandomRecipes(this.bestRecipes, 6, this.randomRecipesIndexes);
    this.showMoreButton = false;
  }

  public getRandomRecipes(
    arr: IRecipe[],
    count: number,
    indexes: number[] = []
  ): IRecipe[] {
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

  public subscribed() {
    Notify.success('Вы подписались на рассылку');
  }
  
  private initPoints() {
    this.whyUsPoints = [
      {
        title: 'Проверенные рецепты',
        body: 'Вы можете найти множество проверенных рецептов, которые помогут вам приготовить вкусные и разнообразные блюда для всей семьи.',
      },
      {
        title: 'Для всех',
        body: 'Вы сможете найти легкие и вкусные блюда, которые понравятся и детям, и взрослым.',
      },
      {
        title: 'Огромное разнообразие',
        body: 'Разнообразие рецептов для всех порадует самых разносторонних гурманов',
      },
      {
        title: 'Храним рецепты для вас',
        body: 'Это отличный способ организовать и хранить свою коллекцию кулинарных рецептов. Вместо того, чтобы хранить бумажные копии или оставлять их в разных кулинарных книгах.',
      },
    ];
  }
}
