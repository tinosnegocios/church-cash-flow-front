import { formatDate } from '@angular/common';
import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ChurchHadler } from 'src/app/handlers/churchHandler';
import { userHandler } from 'src/app/handlers/userHandler';
import { UserEditModel } from 'src/app/models/EditModels/user.mode';
import { ChurchReadModel } from 'src/app/models/ReadModels/ChurchRead.models';
import { ResultViewModel } from 'src/app/models/churchEntitieModels/resultViewModel.models';
import { RegistersPageComponent } from 'src/app/pages/shared/registers-page/registers-page.component';

@Component({
  selector: 'app-secretary-local-register-page',
  templateUrl: './secretary-local-register-page.component.html'
})
export class SecretaryLocalRegisterPageComponent extends RegistersPageComponent implements OnInit {
  private passWord: string = "";

  protected churchs!: ResultViewModel['data'];
  protected formRegister!: FormGroup;
  protected formSearch!: FormGroup;
  protected churchToSelect!: [string, string][]

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
    this.handler.clear();
  }

  protected async save() {
    if (this.passWord !== this.formRegister.controls['password'].value) {
      this.msgErros.push("Senha inválida");
      return;
    }

    var userEdit = new UserEditModel();
    userEdit.name = this.formRegister.controls['name'].value;
    userEdit.churchId = (parseInt(this.formRegister.controls['churchId'].value));
    userEdit.roleIds.push(parseInt(this.formRegister.controls['roleIds'].value));
    userEdit.passwordHash = this.formRegister.controls['password'].value;

    var result = await this.handler.create(userEdit);
    this.msgErros = this.handler.getMsgErro();
    this.msgSuccesss = this.handler.getMsgSuccess();

    this.handler.clear();
  }

  protected async dashBoard() {
    await this.loadChurchs();
  }

  private async loadChurchs() {
    try {
      const dados = await this.churchHandler.getChurchByPeriod(
        formatDate(new Date(1900, 1, 1), 'yyyy-MM-dd', 'en'),
        formatDate(new Date(), 'yyyy-MM-dd', 'en')
      );
      this.churchs = dados.data;

      var meuObjeto: Record<string, string> = {};
      this.churchs.forEach((x: ChurchReadModel) => {
        var key = x.name;
        var value = x.id;

        meuObjeto[key] = `${value}`;
      });

      this.churchToSelect = Object.entries(meuObjeto);

    } catch (error) {
      console.log('error to get churchs:', error);
    }
  }

  protected search() {

  }

  protected generatePassword() {
    this.passWord = "";
    const caracteres = 'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789!@#$%^&*()-_+=';
    for (let i = 0; i < 8; i++) {
      const indice = Math.floor(Math.random() * caracteres.length);
      this.passWord += caracteres.charAt(indice);
    }

    this.formRegister.controls['password'].setValue(this.passWord);
  }

}
