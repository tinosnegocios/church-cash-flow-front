import { HttpClient, HttpErrorResponse, HttpHeaders } from "@angular/common/http";
import { BaseService } from "./base.services";
import { ResultViewModel } from "../models/churchEntitieModels/resultViewModel.models";
import { AuthService } from "./auth.services";
import { Injectable } from "@angular/core";

@Injectable({
  providedIn: 'root'
})

export class PostService extends BaseService {
  constructor(http: HttpClient) {
    super(http);
    this.modelName = "post";
  }

  public async getPosts(): Promise<ResultViewModel> {
    var auth = new AuthService();
    const token = auth.getToken();

    const httpHeaders = new HttpHeaders()
      .set("Content-Type", "application/json; charset=utf-8")
      .set("Authorization", `Bearer ${JSON.parse(token)}`);

    const returnObservable = this.http.get<ResultViewModel>(`${this.url}/v1/${this.modelName}`, { headers: httpHeaders }).toPromise();

    return returnObservable.then(result => {
      if (result) {
        return result;
      } else {
        throw new Error('Result is undefined.');
      }
    });
  }

}