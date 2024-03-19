import { Injectable } from "@angular/core";
import { ResultViewModel } from "../models/churchEntitieModels/resultViewModel.models";
import { BaseHandler } from "./baseHandler";
import { PostService } from "../services/post.services";
import { PostEditModel } from "../models/EditModels/PostEdit.model";

@Injectable({
    providedIn: 'root'
})

export class PostHandler extends BaseHandler {
    private service: PostService;

    constructor(service: PostService) {
        super();
        this.service = service;
    }

    public async getPosts(): Promise<ResultViewModel> {
        var result: ResultViewModel = await this.service.getPosts();
        return result;
    }

    public async create(meeting: PostEditModel): Promise<Boolean> {
        var result = await this.service.create(meeting);

        return await this.resultTreatment(result);
    }

    public async update(meeting: PostEditModel, id: string): Promise<Boolean> {
        var result = await this.service.update(meeting, id);
        console.info(result);
        return await this.resultTreatment(result);
    }

    async delete(idHandle: number): Promise<boolean> {
        var result = await this.service.delete(idHandle);

        if (result!.errors != null && result!.errors.length > 0) {
            result!.errors.forEach(x => {
                this.setMsgErro(x);
            })
            return false;
        } else {
            this.setMsgSuccess("Cargo excluído com sucesso");
            return true;
        }
    }

    public async getByCode(code: string): Promise<ResultViewModel> {
        var result: ResultViewModel = await this.service.searchByCodeGeneral(code);
        return result;
    }
}