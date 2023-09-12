import { EntitieResultApi } from "../Entitie.models";

export class MemberOutReadModel extends EntitieResultApi {
    memberId: number = 0;
    reason: string = "";
    day: string = "";
}