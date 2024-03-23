import { Component } from '@angular/core';

@Component({
  selector: 'app-report-page',
  templateUrl: './report-page.component.html',
})
export class ReportPageComponent {
  protected busy = false;
  protected imageBusy : boolean = false;
  
  protected msgErros: string[] = [];
  protected msgSuccesss: string[] = [];
  protected descriptionHandle: string = "";
  protected idHandle: number = 0;

  protected clear(): void{
    this.msgErros = [];
    this.msgSuccesss = [];
    this.descriptionHandle = "";
    this.idHandle = 0;
  }
}
