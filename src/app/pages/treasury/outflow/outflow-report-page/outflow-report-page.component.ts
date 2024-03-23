import { formatDate } from '@angular/common';
import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { OutFlowHandler } from 'src/app/handlers/outflowHandler';
import { OutFlowReadModel } from 'src/app/models/ReadModels/OutflowRead.model';
import { ReportPageComponent } from 'src/app/pages/shared/report-page/report-page.component';

@Component({
  selector: 'app-outflow-report-page',
  templateUrl: './outflow-report-page.component.html'
})
export class OutflowReportPageComponent extends ReportPageComponent implements OnInit {
  protected models$!: OutFlowReadModel[];
  protected formLimit!: FormGroup;
  protected amountTotalReport: number = 0;

  constructor(private handler: OutFlowHandler, private fbuilder: FormBuilder) {
    super();

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
    todayMinus.setDate(today.getDate() - today.getDate() + 1);

    this.formLimit.controls['initialDate'].setValue(formatDate(todayMinus, 'yyyy-MM-dd', 'en'));
    this.formLimit.controls['finalDate'].setValue(formatDate(today, 'yyyy-MM-dd', 'en'));

    await this.dashBoard();
  }

  protected async dashBoard() {
    this.busy = true;

    this.clear();

    var initialDate = this.formLimit.value.initialDate;
    var finalDate = this.formLimit.value.finalDate;

    var result = await this.handler.getOfferingByPeriod(initialDate, finalDate);
    
    if (result.errors != null && result.errors.length > 0) {
      this.models$ = [];
    } else {
      this.models$ = result.data;

      this.models$.forEach(x => {
        var daySplit = x.day.split("-");
        var dayStr = `${daySplit[2].replace('T00:00:00', '')}/${daySplit[1]}/${daySplit[0]}`;
        x.day = dayStr;
      });

      this.amountTotalReport = this.models$.reduce((acumulador, objeto) => acumulador + objeto.totalAmount, 0);
    }

    this.busy = false;
  }

  public setIdToDelete(eventId: any, eventDescription: string){
    this.idHandle = eventId
    this.descriptionHandle = eventDescription;
  }

  public deleteModel(){
    if(this.idHandle > 0){
      var result = this.handler.delete(this.idHandle)
      .then((result) => {
        this.dashBoard();
        this.msgErros = this.handler.getMsgErro();
        this.msgSuccesss = this.handler.getMsgSuccess();
      })
      .catch((error) => {
        console.log(error);
      });
    }
    
  }
}
