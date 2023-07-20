import { HttpClient, HttpHeaders } from "@angular/common/http";
import { BaseService } from "./base.services";
import { DashBoardService } from "./dashboard.service";
import { ResultViewModel } from "../models/resultViewModel.models";
import { AuthService } from "./auth.services";
import { Injectable } from "@angular/core";
import { Tithes } from "../models/Tithes.models";

@Injectable({
  providedIn: 'root'
})

export class TithesService extends BaseService {
  getByPeiod(initialDate: string, finalDate: string): ResultViewModel | PromiseLike<ResultViewModel> {
      throw new Error("Method not implemented.");
  }
  getLimit(limit: number): ResultViewModel | PromiseLike<ResultViewModel> {
      throw new Error("Method not implemented.");
  }
  searchByCode(id: number): ResultViewModel | PromiseLike<ResultViewModel> {
      throw new Error("Method not implemented.");
  }
  updateOffering(handler: Tithes, handlerId: string) : Promise<ResultViewModel | null> {
      throw new Error("Method not implemented.");
  }
  delete(id: number) : Promise<ResultViewModel | null> {
      throw new Error("Method not implemented.");
  }


  dashBoardServices: DashBoardService;

  constructor(http: HttpClient, dashBoardServices: DashBoardService) {
    super(http);
    this.dashBoardServices = dashBoardServices;
  }

  public async createTithes(handler: Tithes): Promise<ResultViewModel | null>  {
    return null;
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

    //return outflowObservable.pipe(map((result: ResultViewModel) => result.data));
    //return outflowObservable.pipe(map(result => result));

    return returnObservable.then(result => {
      if (result) {
        return result.data;
      } else {
        throw new Error('Result is undefined.');
      }
    });
  }
}