import { Component, Input } from '@angular/core';
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
  @Input() recipes: IRecipe[] = [];
}
