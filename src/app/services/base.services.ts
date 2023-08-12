import { HttpClient, HttpHeaders } from "@angular/common/http";
import { ResultViewModel } from "../models/resultViewModel.models";
import { AuthService } from "./auth.services";
import { Observable, catchError, of } from "rxjs";

export abstract class BaseService {
  protected url: string = 'http://localhost:8181/api';
  protected modelName!: string;

  constructor(protected http: HttpClient) { }

  public async create(offering: any): Promise<ResultViewModel | null> {
    var auth = new AuthService();
    const token = auth.getToken();

    var churchId = (auth.getModelFromToken()).churchId;
    offering.churchId = churchId;

    const httpHeaders = new HttpHeaders()
      .set("Content-Type", "application/json; charset=utf-8")
      .set("Authorization", `Bearer ${JSON.parse(token)}`);

    var result: ResultViewModel;
    var msgErro: string[];

    const returnPromise = new Promise<ResultViewModel>((resolve, reject) => {
      this.http.post<ResultViewModel>(`${this.url}/v1/${this.modelName}`, offering, { headers: httpHeaders })
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

  update(model: any, modelId: string): Promise<ResultViewModel | null> {
    var auth = new AuthService();
    const token = auth.getToken();

    const httpHeaders = new HttpHeaders()
      .set("Content-Type", "application/json; charset=utf-8")
      .set("Authorization", `Bearer ${JSON.parse(token)}`);

    var msgErro: string[];
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

  public delete(id: number): Promise<ResultViewModel | null> {
    var auth = new AuthService();
    const token = auth.getToken();

    const httpHeaders = new HttpHeaders()
      .set("Content-Type", "application/json; charset=utf-8")
      .set("Authorization", `Bearer ${JSON.parse(token)}`);

    var result: ResultViewModel;
    var msgErro: string[];

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