import { Component, OnInit } from '@angular/core';
import { OfferingHandler } from 'src/app/handlers/offeringHandler';
import { Offering } from 'src/app/models/offering.models';
import { Router } from '@angular/router';
import { DashBoardService } from 'src/app/services/dashboard.service';
import { FormBuilder, FormGroup } from '@angular/forms';

@Component({
  selector: 'app-treasury-offering-relatory-page',
  templateUrl: './treasury-offering-relatory-page.component.html'
})
export class TreasuryOfferingRelatoryPageComponent implements OnInit {
  protected busy = false;

  protected offerings$!: Offering[];
  public DashMonth!:  [string, string][];
  public dashMonthSelected: string | undefined;

  protected formLimit!: FormGroup;

  constructor(private handler: OfferingHandler, private router: Router, private dashBoardService: DashBoardService, private fbuilder: FormBuilder) {
    this.formLimit = this.fbuilder.group({
      limitNumber: ['50']
    });

  }

  async ngOnInit() {
    await this.dashBoard();
  }

  protected async dashBoard(){
    this.busy = true;
    var limit = this.formLimit.value.limitNumber;
    var result = await this.handler.getAllOffering(limit);
    if(result.errors != null && result.errors.length > 0){
      this.offerings$ = [];
    }else{
      this.offerings$ = result.data;

      this.offerings$.forEach(x => {
        var daySplit = x.day.split("-");
        var dayStr = `${daySplit[2].replace('T00:00:00', '')}/${daySplit[1]}/${daySplit[0]}`;
        x.day = dayStr;
      });
    }
    this.loadDashMonth()
    this.busy = false;
  }

  public reload() {
    this.router.navigate([this.router.url]);
  }

  public loadDashMonth() {
    const mesesAbreviados = ['Jan', 'Fev', 'Mar', 'Abr', 'Mai', 'Jun', 'Jul', 'Ago', 'Set', 'Out', 'Nov', 'Dez'];

    const dataAtual: Date = new Date();

    const mes: number = dataAtual.getMonth(); // +1 porque os meses são indexados de 0 a 11
    const mesFormatado: string = mes.toString().padStart(2, '0');

    const ano: number = dataAtual.getFullYear();
    const anoAnterior = ano - 1;

    const mesAno: string = `${ano}${mesFormatado}`;
    const meuObjeto: Record<string, string> = {};

    for (let index = mes; index >= 0; index--) {
      var key = `${(mesesAbreviados[index]).toString()}/${ano}`;
      var value = `${ano}${(index + 1).toString().padStart(2, '0')}`

      meuObjeto[key] = value;
    }

    for (let index = 11; index >= mes; index--) {
      var key = `${(mesesAbreviados[index])}/${anoAnterior}`;
      var value = `${anoAnterior}${(index + 1).toString().padStart(2, '0')}`

      meuObjeto[key] = value;
    }

    this.DashMonth = Object.entries(meuObjeto);
  }
  protected async changeDashMonth() {
    this.busy = true;
    this.dashBoardService.setDashBoardMonth(this.dashMonthSelected!.toString());

    await this.dashBoard();
    this.busy = false;
  }


}
