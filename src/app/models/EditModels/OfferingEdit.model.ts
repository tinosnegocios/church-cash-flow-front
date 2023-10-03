import { read } from "xlsx";
import { EntitieResultApi } from "../Entitie.models";
import { Offering } from "../offering.models";

export class OfferingEditModel extends EntitieResultApi {
    Day: string = "";
    Competence: string = "";
    Description: string = "";
    AdultQuantity: number = 0; 
    ChildrenQuantity: number = 0; 
    TotalAmount: number = 0;
    PreacherMemberName: string = "";
    MeetingKindId: number = 0;
    OfferingKindId: number = 0;
    ChurchId: number = 0;
    base64Image: string = "";


    public ConvertTo(model: Offering) : OfferingEditModel  {
        var readDto = new OfferingEditModel();
        readDto.Day = model.day;
        readDto.Competence = model.competence;
        readDto.AdultQuantity = model.adultQuantity;
        readDto.ChildrenQuantity = model.childrenQuantity;
        readDto.ChurchId = model.churchId;
        readDto.MeetingKindId = model.meetingKindId;
        readDto.OfferingKindId = model.offeringKindId;
        readDto.PreacherMemberName = model.preacherMemberName;
        readDto.TotalAmount = model.totalAmount;
        readDto.active = model.active;
        readDto.Description = model.description;
        return readDto;
    }


}