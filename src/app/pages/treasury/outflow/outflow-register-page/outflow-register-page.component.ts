import { Component } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ActivatedRoute } from '@angular/router';
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

  constructor(private handler: OutFlowHandler, private handlerOutFlowKind: OutFlowKindHandler, private fbuilder: FormBuilder,
    private route: ActivatedRoute) {
    super();

    this.formSearch = this.fbuilder.group({
      code: ['']
    });

    this.formOutflow = this.fbuilder.group({
      day: ['', Validators.compose([
        Validators.required,
      ])],
      competence: ['', Validators.compose([
        Validators.required,
      ])],
      authorized: ['aprovado', Validators.compose([
        Validators.required
      ])],
      amount: ['', Validators.compose([
        Validators.required,
        Validators.min(0.1)
      ])],
      interest: ['', Validators.compose([
        Validators.required,
        Validators.min(0.1)
      ])],
      discount: ['', Validators.compose([
        Validators.required,
        Validators.min(0.1)
      ])],
      totalamount: ['', Validators.compose([
        Validators.required,
        Validators.min(0.1)
      ])],
      description: ['', Validators.compose([
        Validators.required,
        Validators.minLength(6),
      ])],
      outflowKindId: ['', Validators.compose([
        Validators.required,
      ])],
      resume: [''],
      photo: ['', Validators.compose([
      ])],
    });
  }

  async ngOnInit() {
    this.route.queryParams
      .subscribe(params => {
        this.codeSearch = params['id'];
      });

    await this.dashBoard();
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
    model.authorized = true;
    var create = await this.handler.create(model)
      .then((result) => {
        console.log(result);
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

  protected showResume() {
    var outflow: string = '';

    var amout = 0, interest = 0, discount = 0, totalAmount = 0;
    if(this.isNumeric(this.formOutflow.controls['amount'].value))
      amout = this.formOutflow.controls['amount'].value;
    if(this.isNumeric(this.formOutflow.controls['interest'].value))
    interest = this.formOutflow.controls['interest'].value;
    if(this.isNumeric(this.formOutflow.controls['discount'].value))
      discount = this.formOutflow.controls['discount'].value;

    totalAmount = (amout + interest - discount );  
    this.formOutflow.controls['totalamount'].setValue(totalAmount);      

    if (this.formOutflow.controls['outflowKindId'].value > 0) {
      var value: string = this.formOutflow.controls['outflowKindId'].value.toString();
      var outflowSelect = this.outFlowKindToSelect.find(key => key[1] === value);
      outflow = outflowSelect![0];
    }

    if (this.formOutflow.valid) {
      var model: OutflowEditModel = this.formOutflow.value;
      var dayConvert = new Date(model.day);
      var dayStr = `${dayConvert.getDate().toString().padStart(2, '0')}/${dayConvert.getMonth().toString().padStart(2, '0')}/${dayConvert.getFullYear()}`

      var resume = `Despesa com ${outflow!} para competencia de ${model.competence} realizado dia ${dayStr} total de ${totalAmount}`;

      this.formOutflow.controls['resume'].setValue(resume);
    }
  }
}
