// export class User implements IUser{
//     public userId: number;
//     public username: string;
//     public role: string;
//     public fullName: string;
//     public posts: number;
//     public dateLastEntry: string;
//     public lastDevice: string;
//     public lastOS: string;
//     public image: string;
    
//     constructor(userId: number, use)
// }

export interface IUser {
    userId: number,
    username: string,
    role: string,
    fullName: string,
    posts: number,
    dateLastEntry: string,
    lastDevice: string,
    lastOS: string,
    image: string,
}