import { HttpClient } from "@angular/common/http";
import { Injectable } from "@angular/core";
import { BaseService } from "./base.services";

@Injectable({
    providedIn: 'root'
})

export class LoginService {
    
    constructor(private http: HttpClient) { }

    private url : string = 'https://localhost:7171/api';;
       
    logIn(data: any) {
        var token = this.http.post<any>(`${this.url}/v1/account/login`, data);
        return token;
    }

}