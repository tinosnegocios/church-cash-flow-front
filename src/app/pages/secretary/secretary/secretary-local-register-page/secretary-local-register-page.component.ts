import { formatDate } from '@angular/common';
import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ChurchHadler } from 'src/app/handlers/churchHandler';
import { userHandler } from 'src/app/handlers/userHandler';
import { ChurchReadModel } from 'src/app/models/ReadModels/ChurchRead.models';
import { RegistersPageComponent } from 'src/app/pages/shared/registers-page/registers-page.component';

@Component({
  selector: 'app-secretary-local-register-page',
  templateUrl: './secretary-local-register-page.component.html'
})
export class SecretaryLocalRegisterPageComponent extends RegistersPageComponent implements OnInit {
  protected formRegister!: FormGroup;
  protected formSearch!: FormGroup;

  protected churchList: ChurchReadModel[] = [];
  
  constructor(private fbuilder: FormBuilder, private handler: userHandler, private churchHandler: ChurchHadler) {
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
  ngOnInit(): void {
    this.clear();
    this.dashBoard();
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

  protected async dashBoard() {
    var churchs = await this.churchHandler.getChurchByPeriod(
      formatDate(new Date(1900,1,1), 'yyyy-MM-dd', 'en'), formatDate(new Date(), 'yyyy-MM-dd', 'en')
      ).then(result => {
        this.churchList = result.data
      });

    console.log(this.churchList);
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
