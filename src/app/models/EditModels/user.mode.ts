import { EntitieResultApi } from "../churchEntitieModels/Entitie.models";

export class UserEditModel extends EntitieResultApi {
    public name: string = "";
    public password: string = "";
    public churchId: number = 0;
    public roleIds: number[] = [];
}