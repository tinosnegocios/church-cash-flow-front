import { Injectable } from "@angular/core";
import { TithesService } from "../services/tithes.service";
import { ResultViewModel } from "../models/resultViewModel.models";
import { Tithes } from "../models/Tithes.models";
import { BaseHandler } from "./baseHandler";

@Injectable({
    providedIn: 'root'
})

export class TithesHandler extends BaseHandler{

    private service: TithesService;

    constructor(handlerService: TithesService) {
        super();
        this.service = handlerService;
    }

    public async create(handler: Tithes): Promise<Boolean> {
        var result = await this.service.createTithes(handler);

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

        
    public async delete(id: number) {
        var result = await  this.service.delete(id);
  
        if (result!.errors != null && result!.errors.length > 0) {
          result!.errors.forEach(x => {
              this.setMsgErro(x);
          })
          return false;
          } else {
              this.setMsgSuccess("oferta excluída com sucesso");
              return true;
          }
      }

    public async update(handler: Tithes, handlerId: string): Promise<Boolean> {
        if(!handler || handlerId == ""){
            this.setMsgErro("data invalid!")
            return false;
        }

        var result = await this.service.updateOffering(handler, handlerId);

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
        var result: ResultViewModel = await this.service.searchByCode(id);
        return result;
    }

    public async getOfferingLimit(limit: number): Promise<ResultViewModel> {
        var result: ResultViewModel = await this.service.getLimit(limit);
        return result;
    }

    public async getOfferingByPeriod(initialDate: string, finalDate: string): Promise<ResultViewModel> {
        var result: ResultViewModel = await this.service.getByPeiod(initialDate, finalDate);
        return result;
    }
}