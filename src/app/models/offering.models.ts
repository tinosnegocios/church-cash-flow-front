import { EntitieResultApi } from "./Entitie.models";

export class Offering extends EntitieResultApi {
    day: string = '';
    adultQuantity: number = 0;
    description: string = '';
    competence: string = '';
    childrenQuantity: number = 0;
    totalAmount: number = 0;
    preacherMemberName: string = '';
    meetingKind: string = '';
    offeringKind: string = '';
    church: string = '';
    id: number = 0;
    active: boolean = false;
    offeringKindId: number = 0;
    meetingKindId: number = 0;
    churchId: number = 0;
}