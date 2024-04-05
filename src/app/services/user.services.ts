import { Injectable } from "@angular/core";
import { BaseService } from "./base.services";
import { HttpClient, HttpHeaders } from "@angular/common/http";
import { AuthService } from "./auth.services";
import { ResultViewModel } from "../models/churchEntitieModels/resultViewModel.models";

@Injectable({
    providedIn: 'root'
})

export class UserServices extends BaseService {
    constructor(http: HttpClient) {
        super(http);
        this.modelName = "user";
    }

    public async getAll() {
        var auth = new AuthService();
        const token = auth.getToken();

        const httpHeaders = new HttpHeaders()
            .set("Content-Type", "application/json; charset=utf-8")
            .set("Authorization", `Bearer ${JSON.parse(token)}`);

        const returnObservable = this.http.get<ResultViewModel>(`${this.url}/v1/${this.modelName}/`, { headers: httpHeaders }).toPromise();

        return returnObservable.then(result => {
            if (result) {
                return result;
            } else {
                throw new Error('Result is undefined.');
            }
        });
    }
}