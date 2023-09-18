import { formatDate } from '@angular/common';
import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { MemberHandler } from 'src/app/handlers/memberHandler';
import { MemberReadModel } from 'src/app/models/ReadModels/MemberRead.models';

@Component({
  selector: 'app-member-report-page',
  templateUrl: './member-report-page.component.html'
})
export class MemberReportPageComponent implements OnInit  {
  protected busy : boolean = false;
  protected msgErrosOffering: string[] = [];
  protected msgSuccesssOffering: string[] = [];
  protected readMembers$!: MemberReadModel[];
  
  protected formLimit!: FormGroup;

  constructor(private handler: MemberHandler, private fbuilder: FormBuilder) {
    this.formLimit = this.fbuilder.group({
      initialDate: ['', Validators.compose([
        Validators.required,
      ])],
      finalDate: ['', Validators.compose([
        Validators.required,
      ])]
    });    
  }

  async ngOnInit() {
      var today = new Date();
      var todayMinus = new Date(today);
      var d = today.getDate();
      todayMinus.setDate(today.getDate() - (today.getDate() + (365 * 50) ) );
      
      this.formLimit.controls['initialDate'].setValue(formatDate(todayMinus, 'yyyy-MM-dd', 'en'));
      this.formLimit.controls['finalDate'].setValue(formatDate(today, 'yyyy-MM-dd', 'en'));
    
      await this.dashBoard();
  }

  public async dashBoard(){
    this.busy = true;   

    this.clear();

    var initialDate = this.formLimit.value.initialDate;
    var finalDate = this.formLimit.value.finalDate; 
    
    var result = await this.handler.getMembersByPeriod(initialDate, finalDate);

    if(result.errors != null && result.errors.length > 0){
      this.readMembers$ = [];
    }else{
      this.readMembers$ = result.data;

      this.readMembers$.forEach(x => {
        var daySplit = x.dateBirth.split("-");
        var dayStr = `${daySplit[2].replace('T00:00:00', '')}/${daySplit[1]}/${daySplit[0]}`;
        x.dateBirth = dayStr;

        daySplit = x.dateBaptism.split("-");
        dayStr = `${daySplit[2].replace('T00:00:00', '')}/${daySplit[1]}/${daySplit[0]}`;
        x.dateBaptism = dayStr;

        var daySplit = x.dateRegister.split("-");
        var dayStr = `${daySplit[2].replace('T00:00:00', '')}/${daySplit[1]}/${daySplit[0]}`;
        x.dateRegister = dayStr;
      });
    }

    this.busy = false;
  }

  protected setIdToDelete(eventId: any, nameString: string){
    console.log('deletando membro ' + nameString);
  }

  protected exportarExcel(){

  }

  private clear(){

  }





}
