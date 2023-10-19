import { State, Action, StateContext, Selector } from '@ngxs/store';

export class AddLike {
  static readonly type = '[Post] Add Like';
  constructor(public postId: number) {}
}

export class UnlikePost {
  static readonly type = '[Post] Unlike Post';
  constructor(public postId: number) {}
}

export class RecipeStateModel {
  likedPosts: number[] = [];
}

@State<RecipeStateModel>({
  name: 'posts',
  defaults: {
    likedPosts: [],
  },
})
export class RecipeState {
  @Action(AddLike)
  addLike(ctx: StateContext<RecipeStateModel>, action: AddLike) {
    const state = ctx.getState();
    const likedPosts = [...state.likedPosts, action.postId];
    ctx.setState({ likedPosts });
  }

  @Action(UnlikePost)
  unlikePost(ctx: StateContext<RecipeStateModel>, action: UnlikePost) {
    const state = ctx.getState();
    const likedPosts = state.likedPosts.filter((postId) => postId !== action.postId);
    ctx.setState({ likedPosts });
  }

  @Selector()
  static likedPosts(state: RecipeStateModel) {
    return state.likedPosts;
  }
}


