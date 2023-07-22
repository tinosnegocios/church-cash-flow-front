import { Injectable } from "@angular/core";

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

}