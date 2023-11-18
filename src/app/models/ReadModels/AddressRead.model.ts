import { EntitieResultApi } from "../churchEntitieModels/Entitie.models";

export class AddressReadModel extends EntitieResultApi {
    country: string = "";
    state: string = "";
    city: string = "";
    zipCode: string = "";
    district: string = "";
    street: string = "";
    additional: string = "";
    number: number = 0;
}