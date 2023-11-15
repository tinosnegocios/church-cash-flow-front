import { HttpClient, HttpHeaders } from "@angular/common/http";
import { BaseService } from "./base.services";
import { DashBoardService } from "./dashboard.service";
import { ResultViewModel } from "../models/churchEntitieModels/resultViewModel.models";
import { AuthService } from "./auth.services";
import { Injectable } from "@angular/core";

@Injectable({
    providedIn: 'root'
})

export class MeetingKindService extends BaseService {
    dashBoardServices: DashBoardService;

    constructor(http: HttpClient, dashBoardServices: DashBoardService) {
        super(http);
        this.dashBoardServices = dashBoardServices;
        this.modelName = "meeting-kind";
    }

    public getMeetingKind():  Promise<ResultViewModel> {
        var auth = new AuthService();
        const token = auth.getToken();

        const httpHeaders = new HttpHeaders()
            .set("Content-Type", "application/json; charset=utf-8")
            .set("Authorization", `Bearer ${JSON.parse(token)}`);
        
        const returnObservable = this.http.get<ResultViewModel>(`${this.url}/v1/${this.modelName}`, { headers: httpHeaders }).toPromise();

        return returnObservable.then(result => {
            if (result) {
              return result.data;
            } else {
              throw new Error('Result is undefined.');
            }
          });
    }
}