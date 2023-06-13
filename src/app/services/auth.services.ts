export class AuthService {

    private strStoragemName = "church.covflw";

    public setToken(token : string) : void {
        const dataToken = JSON.stringify(token);

        localStorage.setItem(`${this.strStoragemName}.token`, dataToken);
    }
    
    public getToken() : string {
        const dataToken = localStorage.getItem(`${this.strStoragemName}.token`);
        
        if (dataToken) {
            console.log("you are already authenticated");
            return dataToken;
        } else {
            console.log("you are not authenticated");
            return "";
        }
    }

}