import { EntitieResultApi } from "./Entitie.models";

export class MeetingKind extends EntitieResultApi {
    name: string = "";
    description: string = "";
    id: number = 0;
    active: boolean = false;
}