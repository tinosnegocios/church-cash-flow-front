import { Injectable } from "@angular/core";
import { MeetingKindEditModel } from "../models/EditModels/MeetingKind.model";
import { MeetingKindService } from "../services/meetingKind.services";
import { BaseHandler } from "./baseHandler";
import { ResultViewModel } from "../models/churchEntitieModels/resultViewModel.models";

@Injectable({
    providedIn: 'root'
})

export class MeetingHandler extends BaseHandler {
    private service: MeetingKindService;

    constructor(service: MeetingKindService) {
        super();
        this.service = service;
    }

    public async create(meeting: MeetingKindEditModel): Promise<Boolean> {
        var result = await this.service.create(meeting);

        return await this.resultTreatment(result);
    }

    public async update(meeting: MeetingKindEditModel, id: string): Promise<Boolean> {
        var result = await this.service.update(meeting, id);
        console.info(result);
        return await this.resultTreatment(result);
    }

    private async resultTreatment(result: ResultViewModel): Promise<Boolean> {
        if (result!.errors != null && result!.errors.length > 0) {
            result!.errors.forEach(x => {
                this.setMsgErro(x);
            })
            return false;
        } else {
            this.setMsgSuccess("Tipo de culto salvo com sucesso");
            return true;
        }
    }

    async delete(idHandle: number): Promise<boolean> {
        var result = await this.service.delete(idHandle);

        if (result!.errors != null && result!.errors.length > 0) {
            result!.errors.forEach(x => {
                this.setMsgErro(x);
            })
            return false;
        } else {
            this.setMsgSuccess("culto excluído com sucesso");
            return true;
        }
    }

    public async getByCode(code: string): Promise<ResultViewModel> {
        var result: ResultViewModel = await this.service.searchByCodeByChurch(code);
        return result;
    }

    public async getAllMeeting(): Promise<ResultViewModel> {
        var result: ResultViewModel = await this.service.getMeetingKind();
        return result;
    }


}