import { Address } from "./Address.models";
import { EntitieResultApi } from "./Entitie.models";

class Church extends EntitieResultApi {
    name: string = "";
    acronym: string = "";
    firstTreasurer: null = null;
    secondTreasurer: null = null;
    firstSecretary: null = null;
    secondSecretary: null = null;
    firstPastor: null = null;
    secondPastor: null = null;
    firstTreasurerId: number = 0;
    secondTreasurerId: number = 0;
    firstSecretaryId: number = 0;
    secondSecretaryId: number = 0;
    firstPastorId: number = 0;
    secondPastorId: number = 0;
    address: Address = new Address();
  }
  