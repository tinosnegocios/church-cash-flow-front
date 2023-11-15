import { Injectable } from "@angular/core";
import { BaseHandler } from "./baseHandler";
import { OfferingKindService } from "../services/offeringKind.services";
import { ResultViewModel } from "../models/churchEntitieModels/resultViewModel.models";

@Injectable({
    providedIn: 'root'
})

export class MemberHandler extends BaseHandler {
    private service: OfferingKindService;

    constructor(service: OfferingKindService) {
        super();
        this.service = service;
    }

    public async getByChurch(): Promise<ResultViewModel> {
        var result: ResultViewModel = await this.service.getOfferingKind();
        return result;
    }

}