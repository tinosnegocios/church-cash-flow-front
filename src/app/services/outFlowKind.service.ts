import { HttpClient, HttpHandler, HttpHeaders } from "@angular/common/http";
import { Injectable } from "@angular/core";
import { BaseService } from "./base.services";
import { AuthService } from "./auth.services";
import { ResultViewModel } from "../models/resultViewModel.models";
import { DashBoardService } from "./dashboard.service";

@Injectable({
    providedIn: 'root'
})

export class OutflowKindService extends BaseService {
    dashBoardServices: DashBoardService;

    constructor(http: HttpClient, dashBoardServices: DashBoardService) {
        super(http);
        this.dashBoardServices = dashBoardServices;
        this.modelName = "outflow-kind";
    }

    getOutflowKind() : Promise<ResultViewModel>{
        var auth = new AuthService();
        const token = auth.getToken();

        const httpHeaders = new HttpHeaders()
            .set("Content-Type", "application/json; charset=utf-8")
            .set("Authorization", `Bearer ${JSON.parse(token)}`);
        
        const returnObservable = this.http.get<ResultViewModel>(`${this.url}/v1/${this.modelName}`, { headers: httpHeaders }).toPromise();

        return returnObservable.then(result => {
            if (result) {
              return result;
            } else {
              throw new Error('Result is undefined.');
            }
          });
    }
}