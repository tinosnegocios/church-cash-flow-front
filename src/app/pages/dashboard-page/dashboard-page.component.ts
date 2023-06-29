import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { Observable, map, tap } from 'rxjs';
import { Member } from 'src/app/models/Member.models';
import { ModelToken } from 'src/app/models/ModelToken.models';
import { OutFlow } from 'src/app/models/Outflow.Models';
import { ResultViewModel } from 'src/app/models/resultViewModel.models';
import { AuthService } from 'src/app/services/auth.services';
import { MembersService } from 'src/app/services/members.services';
import { OutflowService } from 'src/app/services/outflow.services';

@Component({
  selector: 'app-dashboard-page',
  templateUrl: './dashboard-page.component.html'
})
export class DashboardPageComponent implements OnInit {
  private auth: AuthService;
  protected modelToken!: ModelToken;

  protected busy = false;

  protected members!: String[];
  protected outflows!: ResultViewModel;
  
  protected totalMembers = 0;
  protected totalOutFlow = 0;
  public DashMonth! : [string, string][];


  constructor(private router: Router, private membersService: MembersService, private outflowService: OutflowService) {
    this.auth = new AuthService();

  }

  async ngOnInit() {
    var token = this.auth.getToken();
    this.modelToken = this.auth.getModelFromToken();

    if (!token)
      this.router.navigate(['/']);

    this.busy = true;

    await this.dashBoard();
    this.busy = false;
  }

  public logout() {
    this.auth.logout();
    this.router.navigate(['/']);
  }

  public async dashBoard() {

    //get members
    this.membersService.getMembersByChurch()
      .subscribe(dados => {
        this.members = dados.data;
        this.totalMembers = this.members.length;
      },
        error => {
          console.log('errror')
        }
      );

    //get outflows
    this.outflowService.getOutflow()
      .subscribe(dados => {
        this.outflows = dados;

        this.outflows.data.forEach((x : OutFlow) => {
          this.totalOutFlow = this.totalOutFlow + x.totalAmount;
        });
        
      },
      error => {
        console.log('errror')
      }
      );

    this.DashMonth =[ ['valor1', 'valor2'],['valor3', 'valor4'] ];
  }

  public loadDashMonth() : [string, string][] {
        const mesesAbreviados = ['Jan','Fev','Mar','Abr','Mai','Jun','Jul','Ago','Set','Out','Nov','Dez'];

        const dataAtual: Date = new Date();

        const mes: number = dataAtual.getMonth() + 1; // +1 porque os meses são indexados de 0 a 11
        const mesFormatado: string = mes.toString().padStart(2, '0');

        const ano: number = dataAtual.getFullYear();
        const anoAnterior = ano -1;

        const mesAno: string = `${ano}${mesFormatado}`;
        const meuObjeto: Record<string, string> = {};

        for (let index = mes; index >= 0; index--) {
          var key = `${(mesesAbreviados[index]).toString()}/${ano}`;
          var value = `${ano}${(index+1).toString().padStart(2, '0')}`

          meuObjeto[key] = value;
        }

        for (let index = 11; index >= mes; index--) {
          var key = `${(mesesAbreviados[index])}/${anoAnterior}`;
          var value = `${anoAnterior}${(index+1).toString().padStart(2, '0')}`

          meuObjeto[key] = value;
        }

        return Object.entries(meuObjeto);
  }


  protected changeDashMonth(){
    console.log(`mudou para `);
  }

}
