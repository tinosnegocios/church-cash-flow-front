import { HttpClient, HttpHeaders } from "@angular/common/http";
import { BaseService } from "./base.services";
import { DashBoardService } from "./dashboard.service";
import { ResultViewModel } from "../models/resultViewModel.models";
import { AuthService } from "./auth.services";
import { Injectable } from "@angular/core";
import { Tithes } from "../models/Tithes.models";
import { Observable, catchError, of } from "rxjs";

@Injectable({
  providedIn: 'root'
})

export class TithesService extends BaseService {
  private modelName = "tithes";

  getByPeiod(initialDate: string, finalDate: string): Promise<ResultViewModel> {
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

  getLimit(limit: number): ResultViewModel | PromiseLike<ResultViewModel> {
      throw new Error("Method not implemented.");
  }

  update(model: Tithes, modelId: string) : Promise<ResultViewModel | null> {
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


  dashBoardServices: DashBoardService;

  constructor(http: HttpClient, dashBoardServices: DashBoardService) {
    super(http);
    this.dashBoardServices = dashBoardServices;
  }

  public async createTithes(model: Tithes): Promise<ResultViewModel | null>  {
    var auth = new AuthService();
    const token = auth.getToken();

    var churchId = (auth.getModelFromToken()).churchId;
    model.churchId = churchId;

    const httpHeaders = new HttpHeaders()
      .set("Content-Type", "application/json; charset=utf-8")
      .set("Authorization", `Bearer ${JSON.parse(token)}`);

    var result: ResultViewModel;
    var msgErro : string[];

    const returnPromise = new Promise<ResultViewModel>((resolve, reject) => {
      this.http.post<ResultViewModel>(`${this.url}/v1/${this.modelName}`, model, { headers: httpHeaders })
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

  searchById(id: number): ResultViewModel | PromiseLike<ResultViewModel> {
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
}