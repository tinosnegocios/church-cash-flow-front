import { Injectable } from "@angular/core";
import { ResultViewModel } from "../models/resultViewModel.models";
import { BaseHandler } from "./baseHandler";
import { OutflowService } from "../services/outflow.services";
import { OutflowEditModel } from "../models/EditModels/OutFlowEdit.Models";
import { OutflowKindService } from "../services/outFlowKind.service";

@Injectable({
    providedIn: 'root'
})

export class OutFlowKindHandler extends BaseHandler {
    getOfferingKind(): Promise<ResultViewModel>  {
      throw new Error('Method not implemented.');
    }
    private service: OutflowKindService;

    constructor(service: OutflowKindService) {
        super();
        this.service = service;
    }
}