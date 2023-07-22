import { HttpClient, HttpHeaders } from "@angular/common/http";
import { Injectable } from "@angular/core";
import { BaseService } from "./base.services";
import { AuthService } from "./auth.services";
import { ResultViewModel } from "../models/resultViewModel.models";
import { Member } from "../models/Member.models";
import { Observable, map } from "rxjs";
import { DashBoardService } from "./dashboard.service";

@Injectable({
    providedIn: 'root'
})

export class MembersService extends BaseService {
    dashBoardServices: DashBoardService;
    private modelName = "church";

    constructor(http: HttpClient, dashBoardServices: DashBoardService) {
        super(http);
        this.dashBoardServices = dashBoardServices;
    }

    public getMembersByChurchByMonth(): Promise<ResultViewModel>  {
        var auth = new AuthService();
        const token = auth.getToken();

        const httpHeaders = new HttpHeaders()
            .set("Content-Type", "application/json; charset=utf-8")
            .set("Authorization", `Bearer ${JSON.parse(token)}`);

        var churchId = (auth.getModelFromToken()).churchId;
        var yearMonth = this.dashBoardServices.getDashBoardMonth();

        const returnObservable = this.http.get<ResultViewModel>(`${this.url}/v1/${this.modelName}/${churchId}/members/${yearMonth}`, { headers: httpHeaders }).toPromise();

        return returnObservable.then(result => {
            if (result) {
              return result.data;
            } else {
              throw new Error('Result is undefined.');
            }
          });

    }

    public getMembersByChurch(): Promise<ResultViewModel>  {
      var auth = new AuthService();
      const token = auth.getToken();

      const httpHeaders = new HttpHeaders()
          .set("Content-Type", "application/json; charset=utf-8")
          .set("Authorization", `Bearer ${JSON.parse(token)}`);

      var churchId = (auth.getModelFromToken()).churchId;
      var yearMonth = this.dashBoardServices.getDashBoardMonth();

      const returnObservable = this.http.get<ResultViewModel>(`${this.url}/v1/${this.modelName}/${churchId}/members`, { headers: httpHeaders }).toPromise();

      return returnObservable.then(result => {
          if (result) {
            return result.data;
          } else {
            throw new Error('Result is undefined.');
          }
        });
    }
}