import { Component } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { RegistersPageComponent } from 'src/app/pages/shared/registers-page/registers-page.component';

@Component({
  selector: 'app-secretary-local-register-page',
  templateUrl: './secretary-local-register-page.component.html'
})
export class SecretaryLocalRegisterPageComponent extends RegistersPageComponent {
  protected formRegister!: FormGroup;
  protected formSearch!: FormGroup;

  
  constructor(private fbuilder: FormBuilder) {
    super();
    this.formSearch = this.fbuilder.group({
      code: ['', Validators.compose([
        Validators.required
      ])],
    });
    this.formRegister = this.fbuilder.group({
      name: ['', Validators.compose([
        Validators.required
      ])],
      password: ['', Validators.compose([
        Validators.required
      ])],
      passwordConfirm: ['', Validators.compose([
        Validators.required
      ])],
      churchId: ['', Validators.compose([
        Validators.required
      ])],
      roleIds: ['', Validators.compose([
        Validators.required
      ])],
    });
  }

  protected override clearForm(): void {
    throw new Error('Method not implemented.');
  }

  protected clear() {
    this.clearCommonObj();
  }

  protected save() {
    if(! this.checkPassWord())
      return;

    console.log('salvando');
  }

  protected dashboard() {

  }

  protected search() {

  }

  private checkPassWord(): boolean{
    this.clear();
    var pass = this.formRegister.value.password.toString().toUpperCase();
    var confirmPass = this.formRegister.value.passwordConfirm.toString().toUpperCase();

    if(pass !== confirmPass){
      this.msgErros.push("Senhas não conferem");
      console.log(this.msgErros)
      return false;
    }

    return true;
  }

  protected generatePassword(){
    const caracteres = 'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789!@#$%^&*()-_+=';
    let senha = '';
    for (let i = 0; i < 8; i++) {
        const indice = Math.floor(Math.random() * caracteres.length);
        senha += caracteres.charAt(indice);
    }

    this.formRegister.controls['password'].setValue(senha);
  }

  protected changPasswordType() {
    //this.formRegister.controls['password'].
  }

}
