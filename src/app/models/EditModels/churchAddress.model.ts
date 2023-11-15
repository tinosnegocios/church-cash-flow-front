import { AddressEditModel } from "./Address.model";
import { ChurchEditModel } from "./churchEdit.model";

export class ChurchAddress {
    editChurchDto: ChurchEditModel;
    editAddressDto: AddressEditModel;

    constructor(editChurchDto: ChurchEditModel, editAddressDto: AddressEditModel) {
        this.editChurchDto = editChurchDto; 
        this.editAddressDto = editAddressDto;
    }
}