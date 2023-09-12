import { EntitieResultApi } from "../Entitie.models";
import { MemberInReadModel } from "./MemberInRead.model";
import { MemberOutReadModel } from "./MemberOutRead.model";
import { PostReadModel } from "./PostRead.models";

export class MemberReadModel extends EntitieResultApi {
    code: string = "";
    description: string = "";
    name: string = "";
    photo: string = "";
    dateBirth: string = "";
    dateBaptism: string = "";
    dateRegister: string = "";;
    church: string = "";
    memberPost: PostReadModel[] = [];
    memberOut: MemberOutReadModel | undefined;
    memberIn: MemberInReadModel | undefined;
}