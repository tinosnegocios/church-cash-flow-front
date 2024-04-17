import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { userHandler } from 'src/app/handlers/userHandler';
import { UserReadModel } from 'src/app/models/ReadModels/UserRead.model';
import { ReportPageComponent } from 'src/app/pages/shared/report-page/report-page.component';

@Component({
  selector: 'app-secretary-report-page',
  templateUrl: './secretary-report-page.component.html'
})
export class SecretaryReportPageComponent extends ReportPageComponent implements OnInit  {
  protected models$!: UserReadModel[];
  protected formLimit!: FormGroup;

  constructor(private handler: userHandler, private fbuilder: FormBuilder) {
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
    await this.dashBoard()
  }

  protected async dashBoard() {
    var result = await this.handler.getAll();
    this.models$ = result.data;
  }

  public setIdToDelete(eventId: any, eventDescription: string){
    this.idHandle = eventId
    this.descriptionHandle = eventDescription;
  }

  public deleteModel(){
    if(this.idHandle > 0){
      var result = this.handler.deleteById(this.idHandle)
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
