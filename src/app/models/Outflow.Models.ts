import { EntitieResultApi } from "./Entitie.models";

export class OutFlow extends EntitieResultApi {
    Day: Date = new Date();
    Competence: string = "";
    Description: string = "";
    Authorized: boolean = true;
    Amount: number = 0;
    Interest: number = 0;
    Discount: number = 0;
    TotalAmount: number = 0;
    OutFlow: string = "";
    Church: string = "";
}