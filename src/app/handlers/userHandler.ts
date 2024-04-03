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

        console.log('salvando');
        var result = await this.service.create(handler);

        if (result!.errors != null && result!.errors.length > 0) {
            result!.errors.forEach(x => {
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
        if(model.roleIds == null)
            return false;
        if(model.password.trim() == "")
            return false;

        return true;
    }
}