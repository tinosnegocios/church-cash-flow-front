import { formatDate } from '@angular/common';
import { Component } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ChurchHadler } from 'src/app/handlers/churchHandler';
import { CloseMonthlyHandler } from 'src/app/handlers/closeMonthlyHandler';
import { ResultViewModel } from 'src/app/models/churchEntitieModels/resultViewModel.models';
import { ChurchReadModel } from 'src/app/models/ReadModels/ChurchRead.models';

@Component({
  selector: 'app-close-monthly-register-page',
  templateUrl: './close-monthly-register-page.component.html'
})
export class CloseMonthlyRegisterPageComponent {

  protected msgSuccesss: string[] = [];
  protected msgErros: string[] = [];
  protected yearsToSearch: number[] = [];
  protected currentYear: number = new Date().getFullYear(); //PEGAR ANO CARREGADO NO DASHBOARD
  protected busy: boolean = false;

  protected churchToSelect!: [string, string][]
  protected churchs!: ResultViewModel['data'];

  protected formSearchChurch!: FormGroup;

  constructor(private fbuilder: FormBuilder, private churchHandler: ChurchHadler, private handler: CloseMonthlyHandler) {
    this.formSearchChurch = this.fbuilder.group({
      churchId: ['', Validators.compose([
        Validators.required
      ])],
      year: ['', Validators.compose([
        Validators.required
      ])],
    });
  }

  ngOnInit(): void {
    this.dashBoard();
  }

  protected async dashBoard() {
    this.msgErros = [];
    this.msgSuccesss = [];
    this.formSearchChurch.reset();

    console.log('dashBoard');

    await this.loadChurchs();
    this.loadYears();

    this.loadReport();
  }

  private async loadYears() {
    this.yearsToSearch.push(new Date().getFullYear() - 2);
    this.yearsToSearch.push(new Date().getFullYear() - 1);
    this.yearsToSearch.push(new Date().getFullYear());
    this.yearsToSearch.push(new Date().getFullYear() + 1);
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

  protected loadReport() {
    this.msgErros = [];

    var church = this.formSearchChurch.controls['churchId'].value;
    var year = this.formSearchChurch.controls['year'].value;
    console.log(year);
    console.log(church);

    this.msgErros.push('Selecione uma igreja');

    var resultHandler = this.handler.getAllByYear(year);
    console.log(resultHandler);
  }
}
