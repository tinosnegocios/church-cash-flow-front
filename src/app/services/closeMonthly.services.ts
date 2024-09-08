import { Injectable } from "@angular/core";
import { BaseService } from "./base.services";
import { HttpClient, HttpHeaders } from "@angular/common/http";
import { DashBoardService } from "./dashboard.service";
import { AuthService } from "./auth.services";
import { ResultViewModel } from "../models/churchEntitieModels/resultViewModel.models";

@Injectable({
    providedIn: 'root'
})

export class CloseMonthlyService extends BaseService {
    dashBoardServices: DashBoardService;

    constructor(http: HttpClient, dashBoardServices: DashBoardService) {
        super(http);
        this.dashBoardServices = dashBoardServices;
        this.modelName = "monthly-closing";
    }

    public async GetAllByYear(year: number): Promise<ResultViewModel> {
        var auth = new AuthService();
        const token = auth.getToken();

        const httpHeaders = new HttpHeaders()
            .set("Content-Type", "application/json; charset=utf-8")
            .set("Authorization", `Bearer ${JSON.parse(token)}`);

        const returnObservable = this.http.get<ResultViewModel>(`${this.url}/v1/get-${this.modelName}/${year}`, { headers: httpHeaders }).toPromise();

        return returnObservable.then(result => {
            if (result) {
                return result.data;
            } else {
                throw new Error('Fail to get close monthly.');
            }
        });
    }
}