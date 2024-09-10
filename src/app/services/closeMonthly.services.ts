import { Injectable } from "@angular/core";
import { BaseService } from "./base.services";
import { HttpClient, HttpHeaders } from "@angular/common/http";
import { DashBoardService } from "./dashboard.service";
import { AuthService } from "./auth.services";
import { ResultViewModel } from "../models/churchEntitieModels/resultViewModel.models";
import { Observable } from "rxjs";

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

    public  GetAllByYear(year: number): Observable<ResultViewModel> {
        var auth = new AuthService();
        const token = auth.getToken();

        const httpHeaders = new HttpHeaders()
            .set("Cache-control", "no-cache")
            .set("Content-Type", "application/json; charset=utf-8")
            .set("Authorization", `Bearer ${JSON.parse(token)}`);

        return this.http.get<ResultViewModel>(`${this.url}/v1/get-${this.modelName}/${year}`, { headers: httpHeaders });
    }
}