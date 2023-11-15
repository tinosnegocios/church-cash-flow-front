import { HttpClient } from "@angular/common/http";
import { Injectable } from "@angular/core";
import { UserLogin } from "../models/churchEntitieModels/UserLogin.models";
import { configAplication } from "../config/configAplication";

@Injectable({
    providedIn: 'root'
})

export class LoginService {
    
    constructor(private http: HttpClient) { }

    private url : string = configAplication.getApiHosy();
       
    logIn(userlogin: UserLogin) {
        var token = this.http.post<any>(`${this.url}/v1/account/login`, userlogin);
        return token;
    }

}