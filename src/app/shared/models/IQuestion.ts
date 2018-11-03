import { IUser } from "./IUser";

export interface IQuestion{
    Id : string ;
    Title : string;
    Description : string ;
    UploadDate : Date;
    EditDate : Date;
    Image : string;
    Author : IUser;
    Tags : Array<string>;
}