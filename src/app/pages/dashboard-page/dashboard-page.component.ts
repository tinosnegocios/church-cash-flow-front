import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { ChurchHadler } from 'src/app/handlers/churchHandler';
import { ModelToken } from 'src/app/models/churchEntitieModels/ModelToken.models';
import { Tithes } from 'src/app/models/churchEntitieModels/Tithes.models';
import { FirstFruits } from 'src/app/models/churchEntitieModels/firstFruits.model';
import { Offering } from 'src/app/models/churchEntitieModels/offering.models';
import { ResultViewModel } from 'src/app/models/churchEntitieModels/resultViewModel.models';
import { AuthService } from 'src/app/services/auth.services';
import { DashBoardService } from 'src/app/services/dashboard.service';
import { FirstFruitsService } from 'src/app/services/firstFruits.services';
import { OfferingService } from 'src/app/services/offering.services';
import { TithesService } from 'src/app/services/tithes.service';
import { OutFlowHandler } from 'src/app/handlers/outflowHandler';
import { OutFlowReadModel } from 'src/app/models/ReadModels/OutflowRead.model';
import { TithesHandler } from 'src/app/handlers/tithesHandler';
import { BibleService } from 'src/app/services/bible.service';
import { Bible } from 'src/app/models/churchEntitieModels/Bible.models';

@Component({
  selector: 'app-dashboard-page',
  templateUrl: './dashboard-page.component.html'
})
export class DashboardPageComponent implements OnInit {
  private auth: AuthService;
  protected modelToken!: ModelToken;

  protected busy = false;
  protected members!: ResultViewModel['data'];
  protected outflows!: ResultViewModel['data'];
  protected tithes!: ResultViewModel['data'];
  protected offering!: ResultViewModel['data'];
  protected firstFruits!: ResultViewModel['data'];
  protected BibleResultViewModel!: ResultViewModel['data'];
  protected verse = "E conhecereis a verdade, e a verdade vos libertará. João 8:32";
  protected totalMembers = 0;
  protected totalOutFlow = 0;
  protected totalTithes = 0;
  protected totalOffering = 0;
  protected totalFirstFruits = 0;

  public DashMonth!:  [string, string][]
  public dashMonthSelected: string | undefined;


  constructor(private router: Router, private churchHandler: ChurchHadler,
    private outflowHandler: OutFlowHandler, private tithesHandler: TithesHandler,
    private offeringService: OfferingService, private firstFruitsService: FirstFruitsService,
    private bibleService: BibleService, private dashBoardService: DashBoardService) {
    this.auth = new AuthService();
  }

  async ngOnInit() {
    var token = this.auth.getToken();
    this.modelToken = this.auth.getModelFromToken();

    if (!token)
      this.router.navigate(['/']);

    this.busy = true;

    await this.dashBoard();

    this.loadDashMonth();

    this.busy = false;
  }

  public async dashBoard() {
    var yearMonth = this.dashBoardService.getDashBoardMonth();
    this.dashBoardService.setDashBoardMonth(yearMonth);
    this.dashMonthSelected = yearMonth;

    //get members
    try {
      const dados = await this.churchHandler.getMembersByChurch();
      this.members = dados.data;
      this.totalMembers = 0;
      this.members.forEach((x: string) => {
        this.totalMembers += 1;
      });
    } catch (error) {
      console.log('error:', error);
    }

    //get outflow  
    try {
      const dados = await this.outflowHandler.getOutflowByMonth();
      this.outflows = dados.data;
      this.totalOutFlow = 0;
      this.outflows.forEach((x: OutFlowReadModel) => {
        this.totalOutFlow += x.totalAmount;
      });
    } catch (error) {
      console.log('error:', error);
    }

    //get tithes
    try {
      const dados = await this.tithesHandler.getTithesByMonth();
      this.tithes = dados.data;
      this.totalTithes = 0;
      this.tithes.forEach((x: Tithes) => {
        this.totalTithes += x.totalAmount;
      });
    } catch (error) {
      console.log('error:', error);
    }

    //get offering
    try {
      const dados = await this.offeringService.getOfferingByMonth();
      this.offering = dados;
      this.totalOffering = 0;
      this.offering.forEach((x: Offering) => {
        this.totalOffering += x.totalAmount;
      });
    } catch (error) {
      console.log('error:', error);
    }


    //get first-fruits
    try {
      const dados = await this.firstFruitsService.getFirstFruitsByMonth();
      this.firstFruits = dados;
      this.totalFirstFruits = 0;
      this.firstFruits.forEach((x: FirstFruits) => {
        this.totalFirstFruits += x.totalAmount;
      });
    } catch (error) {
      console.log('error:', error);
    }

    //get bible verse
    this.BibleResultViewModel = await this.bibleService.getVerses({ book: "Genesis", chapter: 1, verses: [1] });
    if(this.BibleResultViewModel){
      this.verse = `${this.BibleResultViewModel.data.verses[0].text}.
                    ${this.BibleResultViewModel.data.book} 
                    ${this.BibleResultViewModel.data.chapter}:
                    ${this.BibleResultViewModel.data.verses[0].number}`;
    }
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
