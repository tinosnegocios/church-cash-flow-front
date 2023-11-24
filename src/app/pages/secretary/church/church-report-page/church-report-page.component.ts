import { Component } from '@angular/core';
import { FormBuilder, FormGroup } from '@angular/forms';
import { ChurchHadler } from 'src/app/handlers/churchHandler';
import { ChurchReadModel } from 'src/app/models/ReadModels/ChurchRead.models';
import { ExcelMethods } from 'src/app/utils/excelMethods.utils';

@Component({
  selector: 'app-church-report-page',
  templateUrl: './church-report-page.component.html'
})
export class ChurchReportPageComponent {  
  protected busy : boolean = false;
  protected msgErrosOffering: string[] = [];
  protected msgSuccesssOffering: string[] = [];
  protected readChurch$!: ChurchReadModel[];
  protected idHandle: number = 0;
  protected nameHandler : string = "";
  
  protected formLimit!: FormGroup;

  constructor(private handler: ChurchHadler, private fbuilder: FormBuilder) {
        
  }

  public async dashBoard()
  {
    this.busy = true;   

    this.clear();

    var initialDate = this.formLimit.value.initialDate;
    var finalDate = this.formLimit.value.finalDate; 
    
    var result = await this.handler.getChurchByPeriod(initialDate, finalDate);

    if(result.errors != null && result.errors.length > 0){
      this.readChurch$ = [];
    }else{
      this.readChurch$ = result.data;

      this.readChurch$.forEach(x => {
        var daySplit = x.inaugurationDate.split("-");
        var dayStr = `${daySplit[2].replace('T00:00:00', '')}/${daySplit[1]}/${daySplit[0]}`;
        x.inaugurationDate = dayStr;

        daySplit = x.registerDate.split("-");
        dayStr = `${daySplit[2].replace('T00:00:00', '')}/${daySplit[1]}/${daySplit[0]}`;
        x.registerDate = dayStr;
      });
    }

    this.busy = false;
  }

  protected setIdToDelete(eventId: any, eventDescription: string){
    this.idHandle = eventId
    this.nameHandler = eventDescription;
  }

  protected delete(){
    
  }

  protected exportarExcel(){
    try{
      let element = document.getElementById('excel-table'); 
      var fileName = `relatorio-de-igreja`;
      var excelMethod = new ExcelMethods();
      excelMethod.exportExcel(element, fileName);

      this.msgSuccesssOffering.push("arquivo excel exportado. confira sua pasta de download");
    }catch{
      this.msgErrosOffering.push("Ocorreu um erro ao gerar o arquivo. tente novamente");
    }
  }

  protected clear(){
    this.idHandle = 0;
  }

}
