import { EntitieResultApi } from "../Entitie.models";

export class MemberInReadModel extends EntitieResultApi {
    churchName: string = "";
    lastPost: string = "";
    letterReceiver: string = "";
    memberId: number = 0;
}