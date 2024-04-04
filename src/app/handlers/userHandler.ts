import { Injectable } from "@angular/core";
import { BaseHandler } from "./baseHandler";
import { UserEditModel } from "../models/EditModels/user.mode";
import { UserServices } from "../services/user.services";

@Injectable({
    providedIn: 'root'
})

export class userHandler extends BaseHandler {
    private service: UserServices;

    constructor(handlerService: UserServices) {
        super();
        this.service = handlerService;
    }

    public async create(handler: UserEditModel): Promise<Boolean> {
        if(! await this.checkUser(handler)){
            this.setMsgErro("Preencha todos os campos corretamente");
            return false;
        }

        var result = await this.service.create(handler);
        if (result!.errors!.length > 0) {
            result!.errors!.forEach(x => {
                console.log(x)
                this.setMsgErro(x);
            })
            return false;
        } else {
            this.setMsgSuccess("usuário salvo com sucesso");
            return true;
        }
    }

    private async checkUser(model: UserEditModel): Promise<boolean>{
        if(model.churchId <= 0 || model.churchId == null)
            return false;
        if(model.name.trim() == "")
            return false;
        if(model.roleIds.length <= 0 ||  model.roleIds == null)
            return false;
        if(model.passwordHash.trim() == "")
            return false;
        
        if(model.roleIds.some(element => element <= 0))
            return false;

        return true;
    }
}