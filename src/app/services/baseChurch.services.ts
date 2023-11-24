import { HttpClient, HttpHeaders } from "@angular/common/http";
import { ResultViewModel } from "../models/churchEntitieModels/resultViewModel.models";
import { AuthService } from "./auth.services";
import { Observable, catchError, of } from "rxjs";
import { configAplication } from "../config/configAplication";

export abstract class BaseChurchService {
  protected url: string = '';
  protected modelName!: string;

  constructor(protected http: HttpClient) {
    this.url = configAplication.getApiHosy();
   }

  public async create(model: any): Promise<ResultViewModel | null> {
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

  public async update(idChurch: string, model: any): Promise<ResultViewModel | null> {
    var auth = new AuthService();
    const token = auth.getToken();

    const httpHeaders = new HttpHeaders()
      .set("Content-Type", "application/json; charset=utf-8")
      .set("Authorization", `Bearer ${JSON.parse(token)}`);

    var result: ResultViewModel;
    var msgErro: string[];

    const returnPromise = new Promise<ResultViewModel>((resolve, reject) => {
      this.http.put<ResultViewModel>(`${this.url}/v1/${this.modelName}/${idChurch}`, model, { headers: httpHeaders })
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