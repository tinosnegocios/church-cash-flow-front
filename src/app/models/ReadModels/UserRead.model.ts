import { EntitieResultApi } from "../churchEntitieModels/Entitie.models";

export class UserReadModel extends EntitieResultApi {
    public church: string = "";
    public churchId: number = 0;
    public name: string = "";
    public email: string = "";
    public userRoles: string[] = [];
}