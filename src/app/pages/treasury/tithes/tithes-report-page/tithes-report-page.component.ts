import { formatDate } from '@angular/common';
import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { TithesHandler } from 'src/app/handlers/tithesHandler';
import { Tithes } from 'src/app/models/churchEntitieModels/Tithes.models';
import { DashBoardService } from 'src/app/services/dashboard.service';
import { ExcelMethods } from 'src/app/utils/excelMethods.utils';

@Component({
  selector: 'app-tithes-report-page',
  templateUrl: './tithes-report-page.component.html'
})
export class TithesReportPageComponent implements OnInit {

  private excelMethod: ExcelMethods;

  protected idHandle: number = 0;
  protected descriptionHandle: string = "";

  protected formLimit!: FormGroup;
  protected busy = false;
  protected tithes$!: Tithes[];
  protected msgErrosOffering: string[] = [];
  protected msgSuccesssOffering: string[] = [];

  public DashMonth!:  [string, string][];  

  constructor(private handler: TithesHandler, private router: Router, private dashBoardService: DashBoardService, private fbuilder: FormBuilder) {
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
      todayMinus.setDate(today.getDate() - today.getDate() + 1);
      
      this.formLimit.controls['initialDate'].setValue(formatDate(todayMinus, 'yyyy-MM-dd', 'en'));
      this.formLimit.controls['finalDate'].setValue(formatDate(today, 'yyyy-MM-dd', 'en'));
    
    await this.dashBoard();
  }

  protected async dashBoard(){
    this.busy = true;   

    this.clear();

    var initialDate = this.formLimit.value.initialDate;
    var finalDate = this.formLimit.value.finalDate; 
    
    var result = await this.handler.getByPeriod(initialDate, finalDate);

    if(result.errors != null && result.errors.length > 0){
      this.tithes$ = [];
    }else{
      this.tithes$ = result.data;

      this.tithes$.forEach(x => {
        var daySplit = x.day.split("-");
        var dayStr = `${daySplit[2].replace('T00:00:00', '')}/${daySplit[1]}/${daySplit[0]}`;
        x.day = dayStr;
      });
    }

    this.busy = false;
  }

  public reload() {
    this.router.navigate([this.router.url]);
  }

  protected submit(){
    if(this.formLimit.invalid) {
      this.msgErrosOffering.push("Preenche todos os campos de pesquisa");
      return;
    }

    this.dashBoard();
  }

  protected async changeDashMonth() {
    this.busy = true;
    
    await this.dashBoard();
    this.busy = false;
  }

  public setIdToDelete(eventId: any, memberName: string){
    this.idHandle = eventId
    this.descriptionHandle = memberName;
  }

  public deleteOffering(){
    if(this.idHandle > 0){
      var result = this.handler.delete(this.idHandle)
      .then((result) => {
        this.dashBoard();
        this.msgErrosOffering = this.handler.getMsgErro();
        this.msgSuccesssOffering = this.handler.getMsgSuccess();
      })
      .catch((error) => {
        console.log(error);
      });
    }

    this.handler.clear();
  }

  protected clear(): void{
    this.msgErrosOffering = [];
    this.msgSuccesssOffering = [];
    this.descriptionHandle = "";
  }

  protected exportarExcel(){
    try{
      let element = document.getElementById('excel-table'); 
      var fileName = `relatorio-de-oferta`;
      this.excelMethod.exportExcel(element, fileName);

      this.msgSuccesssOffering.push("arquivo excel exportado. confira sua pasta de download");
    }catch{
      this.msgErrosOffering.push("Ocorreu um erro ao gerar o arquivo. tente novamente");
    }
  }
  
}
