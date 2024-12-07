import { Injectable } from "@angular/core";
import { AuthService } from "./auth.services";
import { HttpClient, HttpHeaders } from "@angular/common/http";
import { ResultViewModel } from "../models/churchEntitieModels/resultViewModel.models";
import { BaseService } from "./base.services";
import { EditBible } from "../models/EditModels/Bible.models";

@Injectable({
    providedIn: 'root'
})

export class BibleService extends BaseService {

    constructor(http: HttpClient) {
        super(http);
        this.modelName = "bible";
      }

    getVerses(editBible: EditBible): PromiseLike<ResultViewModel> {
        var auth = new AuthService();
        const token = auth.getToken();

        const httpHeaders = new HttpHeaders()
            .set("Content-Type", "application/json; charset=utf-8")
            .set("Authorization", `Bearer ${JSON.parse(token)}`);

        var url = `${this.url}/v1/${this.modelName}?book=${editBible.book}&chapter=${editBible.chapter}`;
        editBible.verses.forEach((verse: number) => {
            url += `&verses=${verse}`;
        });

        const returnObservable = 
        this.http.get<ResultViewModel>(url, { headers: httpHeaders }).toPromise();

        return returnObservable.then(result => {
            if (result) {
                return result;
            } else {
                throw new Error('Result is undefined.');
            }
        });
    }

    getRandonVerses(): PromiseLike<ResultViewModel> {
        var auth = new AuthService();
        const token = auth.getToken();

        const httpHeaders = new HttpHeaders()
            .set("Content-Type", "application/json; charset=utf-8")
            .set("Authorization", `Bearer ${JSON.parse(token)}`);

        var url = `${this.url}/v1/${this.modelName}/rand`;
        const returnObservable = this.http.get<ResultViewModel>(url, { headers: httpHeaders }).toPromise();

        return returnObservable.then(result => {
            if (result) {
                return result;
            } else {
                throw new Error('Result is undefined.');
            }
        });
    }
}