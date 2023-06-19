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
  private auth : AuthService;
  protected modelToken! : ModelToken;
  
  protected busy = false;

  protected members! : Observable<Member[]>;
  protected outflows! : Observable<OutFlow[]>;
  protected totalOutflow = 0;

  constructor(private router : Router, private membersService : MembersService, private outflowService : OutflowService) {
    this.auth = new AuthService();

  }

  async ngOnInit() {
    var token = this.auth.getToken();    
    this.modelToken = this.auth.getModelFromToken();
    
    if(!token)
      this.router.navigate(['/']);    

      this.busy = true;
    await this.dashBoard();
    this.busy = false;
  }

  public logout()
  {
    this.auth.logout();
    this.router.navigate(['/']);
  }

  public async dashBoard() {
    this.members = this.membersService.getMembersByChurch();   
    this.outflows = this.outflowService.getOutflow();

    var outF = await this.outflows.toPromise();
    console.log(outF);
    outF!.forEach(x => {
      console.log(x.Description);
      this.totalOutflow = this.totalOutflow + x.TotalAmount;
      console.log(x.TotalAmount);
    })
  }

  public totalOutFlow() : number {


    return 10;
  }

}
