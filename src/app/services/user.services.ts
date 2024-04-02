import { Injectable } from "@angular/core";
import { BaseService } from "./base.services";
import { HttpClient } from "@angular/common/http";

@Injectable({
    providedIn: 'root'
})

export  class UserServices extends BaseService {
    constructor(http: HttpClient) {
        super(http);
        this.modelName = "user";
    }
}