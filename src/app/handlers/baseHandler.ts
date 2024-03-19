import { Injectable } from "@angular/core";
import { ResultViewModel } from "../models/churchEntitieModels/resultViewModel.models";

@Injectable({
    providedIn: 'root'
})

export class BaseHandler {

    protected msgSuccess: string[] = [];
    protected msgError: string[] = [];

    protected setMsgErro(msg: string): void {
        this.msgError.push(msg);
    }
    public getMsgErro(): string[] {
        return this.msgError;
    }
    protected setMsgSuccess(msg: string): void {
        this.msgSuccess.push(msg);
    }
    public getMsgSuccess(): string[] {
        return this.msgSuccess;
    }
    public clear() {
        this.msgError = [];
        this.msgSuccess = [];
    }

    protected async resultTreatment(result: ResultViewModel): Promise<Boolean> {
        if (result!.errors != null && result!.errors.length > 0) {
            result!.errors.forEach(x => {
                this.setMsgErro(x);
            })
            return false;
        } else {
            this.setMsgSuccess("Tipo de culto salvo com sucesso");
            return true;
        }
    }
}