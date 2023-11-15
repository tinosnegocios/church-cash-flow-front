import { EntitieResultApi } from "../churchEntitieModels/Entitie.models";

export class MemberOutReadModel extends EntitieResultApi {
    memberId: number = 0;
    reason: string = "";
    day: string = "";
}