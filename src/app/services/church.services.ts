import { HttpClient, HttpErrorResponse, HttpHeaders } from "@angular/common/http";
import { BaseService } from "./base.services";
import { ResultViewModel } from "../models/churchEntitieModels/resultViewModel.models";
import { AuthService } from "./auth.services";
import { Injectable } from "@angular/core";
import { DashBoardService } from "./dashboard.service";

@Injectable({
  providedIn: 'root'
})

export class ChurchService extends BaseService {
  dashBoardServices: DashBoardService;
  
  constructor(http: HttpClient, dashBoardServices: DashBoardService) {
    super(http);
    this.dashBoardServices = dashBoardServices;
    this.modelName = "church";
  }

  public async getMembers(): Promise<ResultViewModel> {
    var auth = new AuthService();
    const token = auth.getToken();

    var churchId = (auth.getModelFromToken()).churchId;

    const httpHeaders = new HttpHeaders()
      .set("Content-Type", "application/json; charset=utf-8")
      .set("Authorization", `Bearer ${JSON.parse(token)}`);

    const returnObservable = this.http.get<ResultViewModel>(`${this.url}/v1/${this.modelName}/${churchId}/members`, { headers: httpHeaders }).toPromise();

    return returnObservable.then(result => {
      if (result) {
        return result;
      } else {
        throw new Error('Result is undefined.');
      }
    });
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
              return result;
            } else {
              throw new Error('Result is undefined.');
            }
          });

    }
    
}