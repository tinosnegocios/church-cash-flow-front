import { formatDate } from '@angular/common';
import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { MemberHandler } from 'src/app/handlers/memberHandler';
import { MemberReadModel } from 'src/app/models/ReadModels/MemberRead.models';
import { ExcelMethods } from 'src/app/utils/excelMethods.utils';

@Component({
  selector: 'app-member-report-page',
  templateUrl: './member-report-page.component.html'
})
export class MemberReportPageComponent implements OnInit  {
  private excelMethod: ExcelMethods;
  
  protected busy : boolean = false;
  protected msgErrosOffering: string[] = [];
  protected msgSuccesssOffering: string[] = [];
  protected readMembers$!: MemberReadModel[];
  protected idHandle: number = 0;
  protected nameHandler : string = "";
  
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

    this.excelMethod = new ExcelMethods();
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

  protected setIdToDelete(eventId: any, eventDescription: string){
    this.idHandle = eventId
    this.nameHandler = eventDescription;
  }

  protected delete(){
    if(this.idHandle > 0){
      var result = this.handler.delete(this.idHandle)
      .then((result) => {
        //console.log(result);
        this.dashBoard();
        this.msgErrosOffering = this.handler.getMsgErro();
        this.msgSuccesssOffering = this.handler.getMsgSuccess();
      })
      .catch((error) => {
        console.log(error);
      });
    }
  }

  protected exportarExcel(){
    try{
      let element = document.getElementById('excel-table'); 
      var fileName = `relatorio-de-membro`;
      this.excelMethod.exportExcel(element, fileName);

      this.msgSuccesssOffering.push("arquivo excel exportado. confira sua pasta de download");
    }catch{
      this.msgErrosOffering.push("Ocorreu um erro ao gerar o arquivo. tente novamente");
    }
  }

  protected clear(){
    this.idHandle = 0;
  }





}
