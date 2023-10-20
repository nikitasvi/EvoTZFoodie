import { Component } from '@angular/core';
import { TabType } from '../admin-page/admin-page.component';
import { IRecipe } from 'src/app/models/Recipe';
import { RecipesService } from 'src/app/services/recipes.service';
import { MatDialog } from '@angular/material/dialog';
import { DeleteDialogComponent } from 'src/app/shared/dialogs/delete-dialog/delete-dialog.component';

@Component({
  selector: 'app-recipes',
  templateUrl: './recipe.component.html',
  styleUrls: ['./recipe.component.scss', '../_admin.scss']
})
export class RecipeAdminComponent {
  public currentTab: TabType = 'recipes';
  public recipes: IRecipe[] = [];

  constructor(private readonly recipeService: RecipesService,
    private readonly dialog: MatDialog) {
    this.recipeService.getRecipes().subscribe((recipes) => this.recipes = recipes);
  }

  public switchTab(tab: TabType) {
    this.currentTab = tab;
  }

  public openDeleteDialog(id: number) {
    const dialogRef = this.dialog.open(DeleteDialogComponent, {
      width: '512px',
      panelClass: 'dialog',
      data: { id }
    });

    dialogRef.afterClosed().subscribe(result => {
      if (result) {
        const index = this.recipes.findIndex(r => r.id === id);
        if (index !== -1) {
          this.recipes.splice(index, 1);
        }
      }
    });
  }
}
