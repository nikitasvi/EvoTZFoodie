import { Component, Input } from '@angular/core';
import { Select, Store } from '@ngxs/store';
import { Observable, map, take } from 'rxjs';
import { IRecipe } from 'src/app/models/Recipe';
import { AddLike, RecipeState, UnlikePost } from 'src/app/states/like.state';

@Component({
  selector: 'app-recipe-card',
  templateUrl: './recipe-card.component.html',
  styleUrls: ['./recipe-card.component.scss']
})
export class RecipeCardComponent {
  @Input() recipe!: IRecipe;
  @Select(RecipeState.likedPosts)
  likedPosts$!: Observable<number[]>;
  
  constructor(private readonly store: Store) {}

  public likePost(postId: number) {
    if (this.isRecipeLiked(postId)) {
      this.store.dispatch(new UnlikePost(postId));
    } else {
      this.store.dispatch(new AddLike(postId));
    }
  }

  public isRecipeLiked(postId: number): boolean {
    let isLiked = false;
  
    this.likedPosts$.pipe(
      take(1),
      map((likedPosts) => {
        isLiked = likedPosts.includes(postId);
      })
    ).subscribe();
  
    return isLiked;
  }
}
