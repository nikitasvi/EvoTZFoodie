import { Component, OnInit, OnDestroy } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { Meta } from '@angular/platform-browser';
import { ActivatedRoute } from '@angular/router';
import { Subject } from 'rxjs';
import { takeUntil } from 'rxjs/operators';
import { IRecipe } from 'src/app/models/Recipe';
import { RecipesService } from 'src/app/services/recipes.service';
import { ShareDialogComponent } from 'src/app/shared/dialogs/share-dialog/share-dialog.component';

@Component({
  selector: 'app-recipe',
  templateUrl: './recipe.component.html',
  styleUrls: ['./recipe.component.scss'],
})
export class RecipeComponent implements OnInit, OnDestroy {
  private destroy$: Subject<void> = new Subject<void>();
  private recipeId!: number;

  public recipe: IRecipe | null = null;
  public recipes: IRecipe[] = [];
  public otherRecipes: IRecipe[] = [];
  public seeAlso: IRecipe[] = [];

  constructor(
    private readonly recipeService: RecipesService,
    private readonly route: ActivatedRoute,
    private readonly dialog: MatDialog,
    private readonly meta: Meta
  ) {}

  ngOnInit(): void {
    this.route.params.pipe(takeUntil(this.destroy$)).subscribe((params) => {
      this.recipeId = +params['id'];

      if (this.recipeId) {
        this.recipeService.getRecipe(this.recipeId).subscribe((recipe) => {
          this.recipe = recipe;

          this.meta.addTags([
            { name: 'og:name', content: this.recipe.title },
            { name: 'og:description', content: this.recipe.body },
            { name: 'og:image', content: this.recipe.image },
          ]);
        });
      }
    });

    // Не оптимально беру все рецепты ради рандома для 3 и 4, в данном случае ок, так как их мало
    this.recipeService.getRecipes().subscribe((recipes) => {
      this.recipes = recipes;
      this.getRandomRecipes(this.otherRecipes, 3);
      this.getRandomRecipes(this.seeAlso, 4);
    });
  }

  ngOnDestroy(): void {
    this.destroy$.next();
    this.destroy$.complete();
  }

  public openShareDialog() {
    this.dialog.open(ShareDialogComponent, {
      width: '512px',
      panelClass: 'dialog',
    });
  }

  private getRandomRecipes(
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
}
