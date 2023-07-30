import { Injectable } from "@angular/core";
import { Router, UrlTree } from "@angular/router";
import { Observable } from "rxjs";
import { AuthService } from "../services/auth.services";

@Injectable({
    providedIn: 'root'
})

export class AuthHandler {

    public canActivate(): | Observable<boolean | UrlTree>
        | Promise<boolean | UrlTree>
        | boolean
        | UrlTree {

        var authService = new AuthService();

        if (!authService.getToken()) {
            var router: Router = new Router();
            return false;
        }
        
        return true;
    }
}