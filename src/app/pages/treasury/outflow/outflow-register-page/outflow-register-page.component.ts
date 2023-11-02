import { Component } from '@angular/core';
import { FormBuilder, FormGroup } from '@angular/forms';
import { OutFlowKindHandler } from 'src/app/handlers/outFlowKindHandler';
import { OutFlowHandler } from 'src/app/handlers/outflowHandler';
import { OutflowEditModel } from 'src/app/models/EditModels/OutFlowEdit.Models';
import { OutFlowKindReadModel } from 'src/app/models/ReadModels/OutFlowKindRead.model';
import { ResultViewModel } from 'src/app/models/resultViewModel.models';
import { RegistersPageComponent } from 'src/app/pages/shared/registers-page/registers-page.component';

@Component({
  selector: 'app-outflow-register-page',
  templateUrl: './outflow-register-page.component.html'
})
export class OutflowRegisterPageComponent extends RegistersPageComponent{
  protected formOutflow!: FormGroup;
  protected formSearch!: FormGroup;

  protected outFlowKind!: ResultViewModel['data'];
  protected outFlowKindToSelect!: [string, string][]

  private codeSearch: number = 0;

  constructor(private handler: OutFlowHandler, private handlerOutFlowKind: OutFlowKindHandler, private fbuilder: FormBuilder) {
    super();

    this.formSearch = this.fbuilder.group({
      code: ['']
    });
  }
  
 
  protected dashBoard(): void{
    this.busy = true;
    this.clearForm();

    this.loadOutFlowKind();
    
    this.busy = false;

    if (this.codeSearch > 0) {
      this.typeSave = "update"
      this.searchByCode(this.codeSearch);
    } 
  }

  protected async loadOutFlowKind() {
    try {
      const dados = await this.handlerOutFlowKind.getOfferingKind();
      this.outFlowKind = dados.data;
      const meuObjeto: Record<string, string> = {};

      this.outFlowKind.forEach((x: OutFlowKindReadModel) => {

        var key = x.name;
        var value = x.id

        meuObjeto[key] = `${value}`;
      });

      this.outFlowKindToSelect = Object.entries(meuObjeto);
      
    } catch (error) {
      console.log('error to get offering-kind:', error);
    }
  }

  protected override clearForm(): void {
    
  }


  protected async save() {
    this.searchBusy = true;
    
    if (this.typeSave == "create") {
      if(this.formOutflow.invalid)
        return;
        
      await this.create(this.formOutflow.value)

    } else if (this.typeSave == "update") {
      await this.update(this.formOutflow.value, this.formSearch.value.code);
    }

    this.searchBusy = false;
  }
  private async create(model: OutflowEditModel) {
    //var dto = new TithesEditModel().ConvertTo(model);
    //dto.base64Image = this.base64Image;

    var create = await this.handler.create(model)
      .then((result) => {
      })
      .catch((error) => {
        this.msgErros.push("Ocorreu um erro no cadastro. Tente novamente");
      });

    this.msgErros = this.handler.getMsgErro();
    this.msgSuccesss = this.handler.getMsgSuccess();
  }
  private async update(model: OutflowEditModel, modelId: string) {
    //var dto = new TithesEditModel().ConvertTo(model);
    //dto.base64Image = this.base64Image;
    
    this.handler.update(model, modelId)
      .then((result) => {
      })
      .catch((error) => {
        this.msgErros.push("Ocorreu um erro ao atualizar a oferta. Tente novamente");
      });

    this.msgErros = this.handler.getMsgErro();
    this.msgSuccesss = this.handler.getMsgSuccess();
  }

  protected searchByCode(code: number = 0): void{
    
  }

  protected showResume(code: number = 0): void{
    
  }
}
