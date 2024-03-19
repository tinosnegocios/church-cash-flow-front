import { Component } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { PostHandler } from 'src/app/handlers/PostHandler';
import { PostEditModel } from 'src/app/models/EditModels/PostEdit.model';
import { PostReadModel } from 'src/app/models/ReadModels/PostRead.models';
import { ResultViewModel } from 'src/app/models/churchEntitieModels/resultViewModel.models';
import { RegistersPageComponent } from 'src/app/pages/shared/registers-page/registers-page.component';

@Component({
  selector: 'app-post-register-page',
  templateUrl: './post-register-page.component.html'
})
export class PostRegisterPageComponent extends RegistersPageComponent {
  public formSearch!: FormGroup;
  public formPrincipal!: FormGroup;
  private modelCode: string = "";

  constructor(private fbuilder: FormBuilder, private handler: PostHandler) {
    super();
    
    this.formSearch = this.fbuilder.group({
      code: ['', Validators.compose([
        Validators.required
      ])],
    });

    this.formPrincipal = this.fbuilder.group({
      name: ['', Validators.compose([
        Validators.required
      ])],
      description: ['', Validators.compose([
        Validators.required
      ])],
    });

  }
  
  protected override clearForm(): void {
    this.clearCommonObj();
    this.formPrincipal.reset();
    this.formSearch.reset();
    this.typeSave = "create";
  }

  public dashBoard(): void{
    this.clearForm();
  }

  protected async save(): Promise<void>{
    this.searchBusy = true;

    var meetingKind: PostEditModel = this.formPrincipal.value;
       
    if(this.typeSave == "create"){
      await this.handler.create(meetingKind);
    }else if(this.typeSave == "update"){
      await this.handler.update(meetingKind, this.modelCode);
    }

    this.clearForm();

    this.msgSuccesss = this.handler.getMsgSuccess();
    this.msgErros = this.handler.getMsgErro();
    this.searchBusy = false;
  }

  protected async searchByCode(code: string = "") {
    this.searchBusy = true;
    
    if (code.length <= 0)
      code = this.formSearch.value.code;

    this.modelCode = code;
    var modelToForm: ResultViewModel = await this.handler.getByCode(code);

    this.clearForm();
    
    if (modelToForm.errors!.length > 0) {
      this.searchBusy = false;
      this.msgErros.push("Culto não encontrado");
      return;
    }

    console.log(modelToForm);

    this.typeSave = "update";
    var objModel: PostReadModel = modelToForm.data;

    this.fillFormWithModel(objModel);

    this.searchBusy = false;
    this.typeSave = "update";
    this.formSearch.controls['code'].setValue(code);
  }

  private fillFormWithModel(model: PostReadModel): void {
    this.formPrincipal.controls['name'].setValue(model.name);
    this.formPrincipal.controls['description'].setValue(model.description);
  }
}
