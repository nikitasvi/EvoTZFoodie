export interface IRecipe {
    id: number,
    title: string,
    body: string,
    favorite: true,
    timeCooking: number,
    user: {
        id: number;
        name: string;
        date: string;
        image: string;
    };
    tags: string,
    image: string,
}