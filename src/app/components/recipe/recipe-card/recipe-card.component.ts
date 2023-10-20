import { Component, Input } from '@angular/core';
import { Meta } from '@angular/platform-browser';
import { Select, Store } from '@ngxs/store';
import * as Notiflix from 'notiflix';
import { Notify } from 'notiflix';
import { Observable, map, take } from 'rxjs';
import { IRecipe } from 'src/app/models/Recipe';
import { AddLike, RecipeState, UnlikePost } from 'src/app/states/like.state';

@Component({
  selector: 'app-recipe-card',
  templateUrl: './recipe-card.component.html',
  styleUrls: ['./recipe-card.component.scss'],
})
export class RecipeCardComponent {
  @Input() recipe!: IRecipe;
  @Select(RecipeState.likedPosts)
  likedPosts$!: Observable<number[]>;

  constructor(private readonly store: Store, private readonly meta: Meta) {}

  public likePost(postId: number) {
    if (this.isRecipeLiked(postId)) {
      this.store.dispatch(new UnlikePost(postId));
      Notify.success('Убрано из избранного', {
        timeout: 3000,
      });
    } else {
      this.store.dispatch(new AddLike(postId));
      Notify.success('Добавлено в избранное', {
        timeout: 3000,
      });
    }
  }

  public isRecipeLiked(postId: number): boolean {
    let isLiked = false;

    this.likedPosts$
      .pipe(
        take(1),
        map((likedPosts) => {
          isLiked = likedPosts.includes(postId);
        })
      )
      .subscribe();

    return isLiked;
  }
}
