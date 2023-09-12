import { Injectable } from "@angular/core";
import { ResultViewModel } from "../models/resultViewModel.models";
import { BaseHandler } from "./baseHandler";
import { OutflowService } from "../services/outflow.services";

@Injectable({
    providedIn: 'root'
})

export class OutFlowHandler extends BaseHandler {
    private service: OutflowService;

    constructor(service: OutflowService) {
        super();
        this.service = service;
    }

    public async getOutflowByMonth(): Promise<ResultViewModel> {
        var result: ResultViewModel = await this.service.getOutflowByMonth();
        return result;
    }

}