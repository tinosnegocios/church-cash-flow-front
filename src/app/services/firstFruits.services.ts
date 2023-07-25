import { HttpClient, HttpHeaders } from "@angular/common/http";
import { BaseService } from "./base.services";
import { DashBoardService } from "./dashboard.service";
import { ResultViewModel } from "../models/resultViewModel.models";
import { AuthService } from "./auth.services";
import { Injectable } from "@angular/core";
import { FirstFruits } from "../models/firstFruits.model";
import { Observable, catchError, of } from "rxjs";

@Injectable({
    providedIn: 'root'
})

export class FirstFruitsService extends BaseService {
    dashBoardServices: DashBoardService;
    
    constructor(http: HttpClient, dashBoardServices: DashBoardService) {
        super(http);
        this.dashBoardServices = dashBoardServices;
        this.modelName = "first-fruits";
    }

    public getFirstFruitsByMonth():  Promise<ResultViewModel> {
        var auth = new AuthService();
        const token = auth.getToken();

        const httpHeaders = new HttpHeaders()
            .set("Content-Type", "application/json; charset=utf-8")
            .set("Authorization", `Bearer ${JSON.parse(token)}`);

        var churchId = (auth.getModelFromToken()).churchId;
        var yearMonth = this.dashBoardServices.getDashBoardMonth();
        
        const returnObservable = this.http.get<ResultViewModel>(`${this.url}/v1/${this.modelName}/all/${churchId}/${yearMonth}`, { headers: httpHeaders }).toPromise();

        return returnObservable.then(result => {
            if (result) {
              return result.data;
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
  
    update(model: FirstFruits, modelId: string) : Promise<ResultViewModel | null> {
      var auth = new AuthService();
      const token = auth.getToken();
  
      const httpHeaders = new HttpHeaders()
        .set("Content-Type", "application/json; charset=utf-8")
        .set("Authorization", `Bearer ${JSON.parse(token)}`);
  
      var msgErro : string[];
      var churchId = (auth.getModelFromToken()).churchId;
  
      model.churchId = churchId;
  
      const returnPromise = new Promise<ResultViewModel>((resolve, reject) => {
        this.http.put<ResultViewModel>(`${this.url}/v1/${this.modelName}/${modelId}`, model, { headers: httpHeaders })
          .pipe(
            catchError((error: any): Observable<ResultViewModel> => {
              msgErro = error.error.erros;
              return of<ResultViewModel>(error.error);
            })
          )
          .subscribe(
            (data: ResultViewModel) => {
              resolve(data);
            },
            (error: any) => {
              reject(error);
            }
          );
      });
      
      return returnPromise;
    }
  
    public delete(id: number) : Promise<ResultViewModel | null> {
        var auth = new AuthService();
      const token = auth.getToken();
  
      const httpHeaders = new HttpHeaders()
        .set("Content-Type", "application/json; charset=utf-8")
        .set("Authorization", `Bearer ${JSON.parse(token)}`);
  
      var result: ResultViewModel;
      var msgErro : string[];
  
      const returnPromise = new Promise<ResultViewModel>((resolve, reject) => {
        this.http.delete<ResultViewModel>(`${this.url}/v1/${this.modelName}/${id}`, { headers: httpHeaders })
          .pipe(
            catchError((error: any): Observable<ResultViewModel> => {
              msgErro = error.error.erros;
              return of<ResultViewModel>(error.error);
            })
          )
          .subscribe(
            (data: ResultViewModel) => {
              resolve(data);
            },
            (error: any) => {
              reject(error);
            }
          );
      });
      
      return returnPromise;
    }
}