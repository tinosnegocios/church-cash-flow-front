import { HttpClient } from "@angular/common/http";
import { Injectable } from "@angular/core";
import { UserLogin } from "../models/UserLogin.models";

@Injectable({
    providedIn: 'root'
})

export class LoginService {
    
    constructor(private http: HttpClient) { }

    private url : string = 'http://localhost:8181/api';
       
    logIn(userlogin: UserLogin) {
        var token = this.http.post<any>(`${this.url}/v1/account/login`, userlogin);
        return token;
    }

}