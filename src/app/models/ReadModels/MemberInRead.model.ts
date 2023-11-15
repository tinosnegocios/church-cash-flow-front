import { EntitieResultApi } from "../churchEntitieModels/Entitie.models";

export class MemberInReadModel extends EntitieResultApi {
    churchName: string = "";
    lastPost: string = "";
    letterReceiver: string = "";
    memberId: number = 0;
}