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
}