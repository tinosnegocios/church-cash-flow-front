import { Injectable } from "@angular/core";
import { TithesService } from "../services/tithes.service";
import { ResultViewModel } from "../models/resultViewModel.models";
import { Tithes } from "../models/Tithes.models";
import { MembersService } from "../services/members.services";
import { BaseHandler } from "./baseHandler";

@Injectable({
    providedIn: 'root'
})

export class MemberHandler extends BaseHandler {
    private service: MembersService;

    constructor(service: MembersService) {
        super();
        this.service = service;
    }

    public async getByChurch(): Promise<ResultViewModel> {
        var result: ResultViewModel = await this.service.getMembersByChurch();
        return result;
    }

}