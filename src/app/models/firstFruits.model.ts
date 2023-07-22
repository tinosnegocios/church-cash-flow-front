import { EntitieResultApi } from "./Entitie.models";

export class FirstFruits extends EntitieResultApi {
    totalAmount: number = 0;
    day: Date = new Date();
    description: string = "";
    competence: string = "";
    church: string = "";
    member: string = "";
    offeringKind: string = "";
    id: number = 0;
    active: boolean = true;
}