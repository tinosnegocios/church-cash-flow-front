import { HttpClient, HttpHeaders } from "@angular/common/http";
import { Injectable } from "@angular/core";
import { BaseService } from "./base.services";
import { AuthService } from "./auth.services";
import { ResultViewModel } from "../models/resultViewModel.models";
import { Member } from "../models/Member.models";
import { Observable, map } from "rxjs";

@Injectable({
    providedIn: 'root'
})

export class MembersService extends BaseService {

    constructor(http: HttpClient,) {
        super(http);
    }

    public getMembersByChurch(): Observable<Member[]>  {
        var auth = new AuthService();
        const token = auth.getToken();

        const httpHeaders = new HttpHeaders()
            .set("Content-Type", "application/json; charset=utf-8")
            .set("Authorization", `Bearer ${JSON.parse(token)}`);

        var churchId = (auth.getModelFromToken()).churchId;
        const membersObservable = this.http.get<any>(`${this.url}/v1/church/${churchId}/members`, { headers: httpHeaders });
        
        return membersObservable.pipe(map((result: ResultViewModel) => result.data));
    }
}