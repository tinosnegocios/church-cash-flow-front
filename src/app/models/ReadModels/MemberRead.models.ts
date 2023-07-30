import { EntitieResultApi } from "../Entitie.models";

export class MemberReadModel extends EntitieResultApi {
    code: string = "";
    description: string = "";
    name: string = "";
    photo: string = "";
    dateBirth: string = "";
    dateBaptism: string = "";
    dateRegister: string = "";;
    church: string = "";
    memberPosts: string[] = [];
}