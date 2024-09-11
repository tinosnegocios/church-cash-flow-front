import { Injectable } from "@angular/core";
import { BaseHandler } from "./baseHandler";
import { CloseMonthlyService } from "../services/closeMonthly.services";
import { ResultViewModel } from "../models/churchEntitieModels/resultViewModel.models";
import { Observable } from "rxjs";
import { CloseMonthlyEdit } from "../models/EditModels/CloseMonthlyEdit.model";

@Injectable({
    providedIn: 'root'
})

export class CloseMonthlyHandler extends BaseHandler {
    private service: CloseMonthlyService;

    constructor(closeMonthlyService: CloseMonthlyService) {
        super();
        this.service = closeMonthlyService;
    }

    public getAllByYear(churchId: number, year: number): Observable<ResultViewModel> {
        return this.service.GetAllByYear(churchId, year);
    }

    public async create(model: CloseMonthlyEdit): Promise<Boolean> {
        var result = await this.service.blockMonth(model);

        if (result!.errors != null && result!.errors.length > 0) {
            result!.errors.forEach(x => {
                this.setMsgErro(x);
            })
            return false;
        } else {
            return true;
        }
    }

    public async openMonth(idModel: number): Promise<Boolean> {
        var result = await this.service.delete(idModel);

        return true;
    }
}