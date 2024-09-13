import { Injectable } from "@angular/core";
import { BaseService } from "./base.services";
import { HttpClient, HttpHeaders } from "@angular/common/http";
import { DashBoardService } from "./dashboard.service";
import { AuthService } from "./auth.services";
import { ResultViewModel } from "../models/churchEntitieModels/resultViewModel.models";
import { catchError, Observable, of } from "rxjs";
import { CloseMonthlyEdit } from "../models/EditModels/CloseMonthlyEdit.model";

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

    public  GetAllByYear(churchId: number, year: number): Observable<ResultViewModel> {
        var auth = new AuthService();
        const token = auth.getToken();

        const httpHeaders = new HttpHeaders()
            .set("Cache-control", "no-cache")
            .set("Content-Type", "application/json; charset=utf-8")
            .set("Authorization", `Bearer ${JSON.parse(token)}`);

        return this.http.get<ResultViewModel>(`${this.url}/v1/get-${this.modelName}/${churchId}/${year}`, { headers: httpHeaders });
    }

    public async blockMonth(model: CloseMonthlyEdit): Promise<ResultViewModel> {
        var auth = new AuthService();
        const token = auth.getToken();
        
        const httpHeaders = new HttpHeaders()
          .set("Content-Type", "application/json; charset=utf-8")
          .set("Authorization", `Bearer ${JSON.parse(token)}`);
    
        var result: ResultViewModel;
        var msgErro: string[];
    
        const returnPromise = new Promise<ResultViewModel>((resolve, reject) => {
          this.http.post<ResultViewModel>(`${this.url}/v1/${this.modelName}`, model, { headers: httpHeaders })
            .pipe(
              catchError((error: any): Observable<ResultViewModel> => {
                msgErro = error.error.erros;
                return of<ResultViewModel>(error.error);
              })
            )
            .subscribe({
              next(value) {
                resolve(value);
              },
              error(err) {
                reject(err);
              }
            });
        });
    
        return returnPromise;
      }
}