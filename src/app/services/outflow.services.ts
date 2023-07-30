import { HttpClient, HttpHandler, HttpHeaders } from "@angular/common/http";
import { Injectable } from "@angular/core";
import { BaseService } from "./base.services";
import { AuthService } from "./auth.services";
import { ResultViewModel } from "../models/resultViewModel.models";
import { Observable, map } from "rxjs";
import { OutFlow } from "../models/Outflow.Models";
import { DashBoardService } from "./dashboard.service";

@Injectable({
    providedIn: 'root'
})

export class OutflowService extends BaseService {
    dashBoardServices: DashBoardService;

    constructor(http: HttpClient, dashBoardServices: DashBoardService) {
        super(http);
        this.dashBoardServices = dashBoardServices;
        this.modelName = "out-flow";
    }

    public getOutflowByMonth():  Promise<ResultViewModel> {
        var auth = new AuthService();
        const token = auth.getToken();

        const httpHeaders = new HttpHeaders()
            .set("Content-Type", "application/json; charset=utf-8")
            .set("Authorization", `Bearer ${JSON.parse(token)}`);

        var churchId = (auth.getModelFromToken()).churchId;
        var yearMonth = this.dashBoardServices.getDashBoardMonth();
        
        const outflowObservable = this.http.get<ResultViewModel>(`${this.url}/v1/${this.modelName}/${yearMonth}/${churchId}`, { headers: httpHeaders }).toPromise();

        //return outflowObservable.pipe(map((result: ResultViewModel) => result.data));
        //return outflowObservable.pipe(map(result => result));

        return outflowObservable.then(result => {
            if (result) {
              return result.data;
            } else {
              throw new Error('Result is undefined.');
            }
          });
    }
}