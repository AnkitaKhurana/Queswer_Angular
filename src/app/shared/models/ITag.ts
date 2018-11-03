import { IQuestion } from "./IQuestion";

export interface ITag{
    Id: string ;
    Body : string;
    Questions: Array<IQuestion>;
}