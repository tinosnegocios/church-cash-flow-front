import { Injectable } from "@angular/core";
import { ResultViewModel } from "../models/resultViewModel.models";
import { ChurchService } from "../services/church.services";
import { BaseHandler } from "./baseHandler";

@Injectable({
    providedIn: 'root'
})

export class ChurchHadler extends BaseHandler {
    private service: ChurchService;

    constructor(service: ChurchService) {
        super();
        this.service = service;
    }

    public async getByChurch(): Promise<ResultViewModel> {
        var result: ResultViewModel = await this.service.getMembers();
        return result;
    }

    public async getMembersByChurch(): Promise<ResultViewModel> {
        var result: ResultViewModel = await this.service.getMembersByChurchByMonth();
        return result;
    } 

}