import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { LoginService } from '../services/login.services';
import { AuthService } from '../services/auth.services';

@Component({
  selector: 'app-login-page',
  templateUrl: './login-page.component.html'
})
export class LoginPageComponent implements OnInit {
  public formLogin!: FormGroup;
  private auth : AuthService;

  constructor(private loginService: LoginService, private fbuilder: FormBuilder, private router: Router) {
    this.formLogin = this.fbuilder.group({
      code: ['FB27C3',Validators.compose([
        Validators.required,
        Validators.minLength(6),
        Validators.maxLength(6)
      ])],
      password: ['12345678', Validators.compose([
        Validators.required, 
        Validators.minLength(6),
        Validators.maxLength(8)
      ])]
    });

    this.auth = new AuthService();
  }

  ngOnInit() : void {
    var token = this.auth.getToken();

    if(token)
      this.router.navigate(['/dashboard']);
  }

  public submitLogin() : void {
    this.loginService
    .logIn(this.formLogin.value)
    .subscribe(
      (result: any): void => {
        this.makeLogin(result);
      },
      (error: any) => {
        // var result = (error.error.errors[0]);
        // console.log(error);
        // console.log(result);
        this.treatErro();
      }
    );
    ;
  }

  private treatErro() : void {
    console.log("Error. Check yours credentials!");
  }

  private makeLogin(result : any) : void{
    this.auth.setToken(result.data);

    console.log("login sucessful. redirected for dashboard..");
    this.router.navigate(['/dashboard']);
  }

}
