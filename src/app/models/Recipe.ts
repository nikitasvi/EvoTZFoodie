export interface IRecipe {
  id: number;
  title: string;
  tags: string;
  user: {
    id: number;
    name: string;
    date: string;
    image: string;
  };
  image: string;
  body: string;
  timeCooking: number;
  favorite: true;

  // extended properties
  foodValue?: {
    calories: number;
    fats: number;
    carbohydrates: number;
    belki: number;
  };
  comments?: IComment[];
  additionalInformation?: {
    ingredients: string[];
    details: IDetail[];
  };
}

export interface IComment {
  postId: number;
  id: number;
  body: string;
  user: {
    id: number;
    username: string;
  };
  dateCreated: Date;
}

export interface IDetail {
  title: string;
  body: string;
}
