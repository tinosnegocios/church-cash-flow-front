import { HttpClient, HttpHeaders } from "@angular/common/http";
import { BaseService } from "./base.services";
import { DashBoardService } from "./dashboard.service";
import { ResultViewModel } from "../models/churchEntitieModels/resultViewModel.models";
import { AuthService } from "./auth.services";
import { Injectable } from "@angular/core";
import { Tithes } from "../models/churchEntitieModels/Tithes.models";
import { Observable, catchError, of } from "rxjs";

@Injectable({
  providedIn: 'root'
})

export class TithesService extends BaseService {
  dashBoardServices: DashBoardService;

  constructor(http: HttpClient, dashBoardServices: DashBoardService) {
    super(http);
    this.dashBoardServices = dashBoardServices;
    this.modelName = "tithes";
  }

  public getTithesByMonth(): Promise<ResultViewModel> {
    var auth = new AuthService();
    const token = auth.getToken();

    const httpHeaders = new HttpHeaders()
      .set("Content-Type", "application/json; charset=utf-8")
      .set("Authorization", `Bearer ${JSON.parse(token)}`);

    var churchId = (auth.getModelFromToken()).churchId;
    var yearMonth = this.dashBoardServices.getDashBoardMonth();

    const returnObservable = this.http.get<ResultViewModel>(`${this.url}/v1/tithes/all/${churchId}/${yearMonth}`, { headers: httpHeaders }).toPromise();

    return returnObservable.then(result => {
      if (result) {
        return result;
      } else {
        throw new Error('Result is undefined.');
      }
    });
  }

  searchByIdByChurch(id: number): ResultViewModel | PromiseLike<ResultViewModel> {
    var auth = new AuthService();
    const token = auth.getToken();

    var churchId = (auth.getModelFromToken()).churchId;

    const httpHeaders = new HttpHeaders()
      .set("Content-Type", "application/json; charset=utf-8")
      .set("Authorization", `Bearer ${JSON.parse(token)}`);

    const returnObservable = this.http.get<ResultViewModel>(`${this.url}/v1/${this.modelName}/${churchId}/${id}`, { headers: httpHeaders }).toPromise();

    return returnObservable.then(result => {
      if (result) {
        return result;
      } else {
        console.log('nao deu');
        throw new Error('Result is undefined.');
      }
    });
  }

  getByPeriod(initialDate: string, finalDate: string): Promise<ResultViewModel> {
    var auth = new AuthService();
    const token = auth.getToken();

    var churchId = (auth.getModelFromToken()).churchId;

    const httpHeaders = new HttpHeaders()
      .set("Content-Type", "application/json; charset=utf-8")
      .set("Authorization", `Bearer ${JSON.parse(token)}`);

    const returnObservable = this.http.get<ResultViewModel>(`${this.url}/v1/${this.modelName}/period/${churchId}/?initialDate=${initialDate}&finalDate=${finalDate}`, { headers: httpHeaders }).toPromise();

    return returnObservable.then(result => {
      if (result) {
        return result;
      } else {
        console.log('nao deu');
        throw new Error('Result is undefined.');
      }
    });
  }

}