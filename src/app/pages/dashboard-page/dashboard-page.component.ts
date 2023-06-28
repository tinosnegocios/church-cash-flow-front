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
  public DashMonth! : Record<string, number>;

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
  }

  public loadDashMonth() : [string, number][] {
        //fill dashboardmonth
        this.DashMonth = {
          Jan: 202301,
          Fev: 202302,
          Mar: 202303
        };

        const dataAtual: Date = new Date();

        const mes: number = dataAtual.getMonth() + 1; // +1 porque os meses são indexados de 0 a 11
        const ano: number = dataAtual.getFullYear();
        const anoAnterior = ano -1;
        
        const mesFormatado: string = mes.toString().padStart(2, '0');
        const mesAno: string = `${ano}${mesFormatado}`;
        
        return Object.entries(this.DashMonth);
  }

}
