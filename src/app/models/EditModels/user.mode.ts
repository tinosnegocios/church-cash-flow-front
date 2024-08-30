import { EntitieResultApi } from "../churchEntitieModels/Entitie.models";

export class UserEditModel extends EntitieResultApi {
    public name: string = "";
    public email: string = "";
    public passwordHash: string = "";
    public churchId: number = 0;
    public roleIds: number[] = [];
}