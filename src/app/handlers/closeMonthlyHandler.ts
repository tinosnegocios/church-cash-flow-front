import { Injectable } from "@angular/core";
import { BaseHandler } from "./baseHandler";
import { CloseMonthlyService } from "../services/closeMonthly.services";

@Injectable({
    providedIn: 'root'
})

export class CloseMonthlyHandler extends BaseHandler{
    private service: CloseMonthlyService;

    constructor(closeMonthlyService: CloseMonthlyService) {
        super();
        this.service = closeMonthlyService;
    }

    public async getAllByYear(year: number): Promise<Boolean> {
        var result = await this.service.GetAllByYear(year);
        
        if (result!.errors != null && result!.errors.length > 0) {
            result!.errors.forEach(x => {
                this.setMsgErro(x);
            });
            return false;
        } else {
            return true;
        }
    }
}