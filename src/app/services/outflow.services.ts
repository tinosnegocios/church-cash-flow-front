import { HttpClient, HttpHandler, HttpHeaders } from "@angular/common/http";
import { Injectable } from "@angular/core";
import { BaseService } from "./base.services";
import { AuthService } from "./auth.services";
import { ResultViewModel } from "../models/resultViewModel.models";
import { Observable, map } from "rxjs";
import { OutFlow } from "../models/Outflow.Models";
import { Member } from "../models/Member.models";

@Injectable({
    providedIn: 'root'
})

export class OutflowService extends BaseService {

    constructor(http: HttpClient) {
        super(http);
    }

    public getOutflow(): Observable<ResultViewModel> {
        var auth = new AuthService();
        const token = auth.getToken();

        const httpHeaders = new HttpHeaders()
            .set("Content-Type", "application/json; charset=utf-8")
            .set("Authorization", `Bearer ${JSON.parse(token)}`);

        var churchId = (auth.getModelFromToken()).churchId;
        const outflowObservable = this.http.get<ResultViewModel>(`${this.url}/v1/out-flow/all/${churchId}`, { headers: httpHeaders });

        //return outflowObservable.pipe(map((result: ResultViewModel) => result.data));
        return outflowObservable.pipe(map(result => result));
    }
}