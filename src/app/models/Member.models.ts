import { EntitieResultApi } from "./Entitie.models";

export class Member extends EntitieResultApi{
    code: string = "";
    name: string = "";
    photo: string = "";
    dateBirth: string = "";
    dateBaptism: string = "";
    church: string = "";
    post: string = "";
    memberPosts: string[] = [];
    id: number = 0;
}