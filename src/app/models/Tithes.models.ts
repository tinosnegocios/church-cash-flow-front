import { EntitieResultApi } from "./Entitie.models";

export class Tithes extends EntitieResultApi {
    totalAmount: number = 0;
    day: string = '';
    description: string = "";
    competence: string = "";
    church: string = "";
    churchId: number = 0;
    member: string = "";
    memberId: number = 0;
    offeringKind: string = "";
    offeringKindId: number = 0;
    photo: string = "";
}