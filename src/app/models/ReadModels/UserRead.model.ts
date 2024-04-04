import { EntitieResultApi } from "../churchEntitieModels/Entitie.models";

export class UserReadModel extends EntitieResultApi {
    public church: string = "";
    public name: string = "";
    public userRoles: string[] = [];
}