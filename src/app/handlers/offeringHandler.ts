import { Injectable } from "@angular/core";
import { Offering } from "../models/offering.models";
import { OfferingService } from "../services/offering.services";
import { ResultViewModel } from "../models/resultViewModel.models";

@Injectable({
    providedIn: 'root'
})

export class OfferingHandler {

    private service: OfferingService;
    private msgSuccess: string[] = [];
    private msgError: string[] = [];

    constructor(offeringService: OfferingService) {
        this.service = offeringService;
    }

    public async create(offering: Offering): Promise<Boolean> {
        var result = await this.service.createOffering(offering);

        if (result!.errors != null && result!.errors.length > 0) {
            result!.errors.forEach(x => {
                this.setMsgErro(x);
            })
            return false;
        } else {
            this.setMsgSuccess("oferta salva com sucesso");
            return true;
        }
    }

    public async update(offering: Offering, offeringId: string): Promise<Boolean> {
        if(!offering || offeringId == ""){
            this.setMsgErro("data invalid!")
            return false;
        }

        var result = await this.service.updateOffering(offering, offeringId);

        if (result!.errors != null && result!.errors.length > 0) {
            result!.errors.forEach(x => {
                this.setMsgErro(x);
            })
            return false;
        } else {
            this.setMsgSuccess("oferta salva com sucesso");
            return true;
        }
    }

    public async getById(id: number) : Promise<ResultViewModel>{
        var result: ResultViewModel = await this.service.searchOfferingByCode(id);
        return result;
    }

    public async getAllOffering(limit: number): Promise<ResultViewModel> {
        var result: ResultViewModel = await this.service.getAllOffering(limit);
        return result;
    }








    private setMsgErro(msg: string): void {
        this.msgError.push(msg);
    }
    public getMsgErro(): string[] {
        return this.msgError;
    }
    private setMsgSuccess(msg: string): void {
        this.msgSuccess.push(msg);
    }
    public getMsgSuccess(): string[] {
        return this.msgSuccess;
    }
    public clear() {
        this.msgError = [];
        this.msgSuccess = [];
    }

}