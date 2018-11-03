import { IUser } from "./IUser";

export interface IAnswer{
    Id : string ;
    Body : string;
    UpvoteCount : number ;
    DownvoteCount : number;
    UploadDate : Date;
    EditDate : Date;
    Author : IUser;
    QuestionId : string;
    AuthorId: string;
    Upvoted : boolean;
    Downvoted : boolean;
}