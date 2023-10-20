import { Injectable } from '@angular/core';
import { ApiClient } from './api.client';
import { IRecipe } from '../models/Recipe';

@Injectable({
  providedIn: 'root',
})
export class RecipesService {
  constructor(private readonly apiClient: ApiClient) {}

  public getRecipes() {
    return this.apiClient.get<IRecipe[]>('posts');
  }

  public getRecipe(id: number) {
    return this.apiClient.get<IRecipe>(`posts/${id}`);
  }

  public updateRecipe(id: number, data: Object) {
    return this.apiClient.patch<IRecipe>(`posts/${id}`, data);
  }

  public createRecipe(recipe: IRecipe) {
    return this.apiClient.post<IRecipe>('posts', recipe);
  }
}
