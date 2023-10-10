import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { UserLogin } from 'src/app/models/UserLogin.models';
import { AuthService } from 'src/app/services/auth.services';
import { LoginService } from 'src/app/services/login.services';

@Component({
  selector: 'app-login-page',
  templateUrl: './login-page.component.html',
  styleUrls: ['./login-page.component.css']
})
export class LoginPageComponent implements OnInit {
  protected formLogin!: FormGroup;
  private auth : AuthService;
  protected busy = false;
  protected errorLogin = false;
  private remember = false;

  constructor(private loginService: LoginService, private fbuilder: FormBuilder, private router: Router) {
    this.formLogin = this.fbuilder.group({
      code: ['65B615',Validators.compose([
        Validators.required,
        Validators.minLength(6),
        Validators.maxLength(6)
      ])],
      passwordHash: ['12345678', Validators.compose([
        Validators.required, 
        Validators.minLength(6),
        Validators.maxLength(8)
      ])],
      remember: [true]
    });

    this.auth = new AuthService();
  }

  ngOnInit() : void {
    var token = this.auth.getToken();
    if(token)
      this.router.navigate(['/dashboard']);
  }

  submitLogin() : void {
    this.busy = true;

    var userLogin = new UserLogin(this.formLogin.value.code,this.formLogin.value.passwordHash);
    this.remember = this.formLogin.value.remember;

    this.loginService
    .logIn(userLogin)
    .subscribe(
      (result: any) => {
        this.makeLogin(result);
        this.busy = false;
      },
      (error) => {
        console.log(error);
        this.treatErro();
        this.busy = false;
        this.errorLogin = true;
      }
    );
  }

  private treatErro() : void {
    console.log("Error. Check yours credentials!");
  }

  private makeLogin(result : any) : void{
    this.auth.setSessionToken(result.data);

    console.log("login sucessful. redirected for dashboard..");
    this.router.navigate(['/dashboard']);
  }

  protected clearWindow(){
    this.errorLogin = false;
  }

}
