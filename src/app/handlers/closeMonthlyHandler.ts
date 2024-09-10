import { Injectable } from "@angular/core";
import { BaseHandler } from "./baseHandler";
import { CloseMonthlyService } from "../services/closeMonthly.services";
import { ResultViewModel } from "../models/churchEntitieModels/resultViewModel.models";
import { Observable } from "rxjs";

@Injectable({
    providedIn: 'root'
})

export class CloseMonthlyHandler extends BaseHandler{
    private service: CloseMonthlyService;

    constructor(closeMonthlyService: CloseMonthlyService) {
        super();
        this.service = closeMonthlyService;
    }

    public getAllByYear(year: number): Observable<ResultViewModel> {
        return this.service.GetAllByYear(year);
    }
      
}