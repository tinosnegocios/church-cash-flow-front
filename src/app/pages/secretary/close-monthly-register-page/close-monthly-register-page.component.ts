import { formatDate } from '@angular/common';
import { Component } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ChurchHadler } from 'src/app/handlers/churchHandler';
import { CloseMonthlyHandler } from 'src/app/handlers/closeMonthlyHandler';
import { CloseMonthly } from 'src/app/models/churchEntitieModels/CloseMonthly.models';
import { ResultViewModel } from 'src/app/models/churchEntitieModels/resultViewModel.models';
import { CloseMonthlyEdit } from 'src/app/models/EditModels/CloseMonthlyEdit.model';
import { ChurchReadModel } from 'src/app/models/ReadModels/ChurchRead.models';

@Component({
  selector: 'app-close-monthly-register-page',
  templateUrl: './close-monthly-register-page.component.html'
})
export class CloseMonthlyRegisterPageComponent {

  protected msgSuccesss: string[] = [];
  protected msgErros: string[] = [];
  protected yearsToSearch: number[] = [];
  protected currentYear: number = new Date().getFullYear();
  protected busy: boolean = false;

  protected churchToSelect!: [string, string][]
  protected churchs!: ResultViewModel['data'];
  protected closeMonthly$!: CloseMonthly[];

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

    await this.loadChurchs();
    this.loadYears();

    await this.loadReport();
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

  protected async loadReport() {
    this.msgErros = [];
    this.closeMonthly$ = [];

    var church = this.formSearchChurch.controls['churchId'].value ?? '';
    var year = this.formSearchChurch.controls['year'].value ?? this.currentYear;

    if (church == '' || year == "") {
      return;
    }

    for (let index = 1; index <= 12; index++) {
      var churchMonthly = new CloseMonthly();
      churchMonthly.churchId = parseInt(church);
      churchMonthly.church = this.churchToSelect.find(x => x[1] === church)![0]
      churchMonthly.yeahMonth = `${index.toString().padStart(2, '0')}/${year}`;
      churchMonthly.block = false;
      this.closeMonthly$.push(churchMonthly);
    }

    this.handler.getAllByYear(church, year).subscribe(result => {
      if (result.data != null && result.errors!.length == 0) {
        this.closeMonthly$.forEach((x: CloseMonthly) => {
          const month = result.data.find((item: CloseMonthly) => item.yeahMonth === x.yeahMonth);
          if (month) {
            x.block = month.block;
            x.id = month.id;
          }
        });
      }
    });
  }

  protected async closeMonth(idModel: number) {
    this.busy = true;

    const churchToClose = this.closeMonthly$.find(month => month.id === idModel);
    console.log('churchToClose:', churchToClose);
        
    if (churchToClose) {
      const period = `${churchToClose!.yeahMonth.toString().substring(3,churchToClose!.yeahMonth.toString().length)}${churchToClose!.yeahMonth.toString().substring(0,2)}`;
      var editCloseMonthly = new CloseMonthlyEdit();
      editCloseMonthly.ChurchId = churchToClose.churchId;
      editCloseMonthly.Block = true;
      editCloseMonthly.YearMonth = Number(period);
      await this.handler.create(editCloseMonthly);

      await this.loadReport();
    }

    this.busy = false;
  }

  protected async openMonth(idModel: number) {
    this.busy = true;
    console.log('idModel:', idModel);
    if(idModel > 0) {
      await this.handler.openMonth(idModel);
      await this.loadReport();
    }

    this.busy = false;
  }
}
