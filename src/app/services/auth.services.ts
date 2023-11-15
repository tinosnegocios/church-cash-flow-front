import jwtDecode from "jwt-decode";
import { ModelToken } from "../models/churchEntitieModels/ModelToken.models";

export class AuthService {

    private strStoragemName = "church.covflw";

    private getSessionToken() : string {
        const dataToken = sessionStorage.getItem(`${this.strStoragemName}.token`);
        
        if (dataToken) {
            return dataToken;
        } else {
            return "";
        }
    }

    private getLocalToken() : string {
        const dataToken = localStorage.getItem(`${this.strStoragemName}.token`);
        
        if (dataToken) {
            return dataToken;
        } else {
            return "";
        }
    }

    public logout() : void {
        sessionStorage.removeItem(`${this.strStoragemName}.token`);
        localStorage.removeItem(`${this.strStoragemName}.token`);
    }

    public getModelFromToken() : ModelToken {
        const token = this.getToken();
        const modelToken : ModelToken = jwtDecode(token);  

        return modelToken;        
    }

    public setLocalToken(token : string) : void {
        const dataToken = JSON.stringify(token);

        localStorage.setItem(`${this.strStoragemName}.token`, dataToken);
    }

    public setSessionToken(token : string) : void {
        const dataToken = JSON.stringify(token);

        sessionStorage.setItem(`${this.strStoragemName}.token`, dataToken);
    }
    
    public getToken() : string {
        var token = this.getLocalToken();

        if(token == null || token.length <= 0) {
            token = this.getSessionToken();
        }

        if(token == null || token.length == 0) {
            return "";
        }else{
            const modelToken : ModelToken = jwtDecode(token);  
            const epochTimeNow = Math.floor(Date.now() / 1000);

            if((modelToken.exp - epochTimeNow) > 0){
                return token;
            }else{
                return "";
            }
        }
    }





}