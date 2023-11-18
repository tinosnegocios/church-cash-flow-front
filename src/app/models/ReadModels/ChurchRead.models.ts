import { EntitieResultApi } from "../churchEntitieModels/Entitie.models";
import { AddressReadModel } from "./AddressRead.model";

export class ChurchReadModel extends EntitieResultApi {
    name: string = "";
    acronym: string = "";
    firstTreasurer: string = "";
    SecondTreasurer: string = "";
    firstSecretary: string = "";
    secondSecretary: string = "";
    firstPastor: string = "";
    secondPastor: string = "";

    firstTreasurerId: number = 0;
    secondTreasurerId: number = 0;
    firstSecretaryId: number = 0;
    secondSecretaryId: number = 0;
    firstPastorId: number = 0;
    secondPastorId: number = 0;

    address?: AddressReadModel;
}