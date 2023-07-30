import { Injectable } from "@angular/core";
import { ResultViewModel } from "../models/resultViewModel.models";
import { BaseHandler } from "./baseHandler";
import { PostService } from "../services/post.services";

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

}