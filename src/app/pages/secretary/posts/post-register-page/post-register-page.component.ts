import { Component } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { RegistersPageComponent } from 'src/app/pages/shared/registers-page/registers-page.component';

@Component({
  selector: 'app-post-register-page',
  templateUrl: './post-register-page.component.html'
})
export class PostRegisterPageComponent extends RegistersPageComponent {
  public formSearch!: FormGroup;
  public formPrincipal!: FormGroup;
  private modelCode: string = "";

  constructor(private fbuilder: FormBuilder) {
    super();
    
    this.formSearch = this.fbuilder.group({
      code: ['', Validators.compose([
        Validators.required
      ])],
    });

    

  }
  
  protected override clearForm(): void {
  }

  public dashBoard(): void{
    this.clearForm();
  }

  protected async save(): Promise<void>{
  }

  protected async searchByCode(code: string = "") {

  }

  private fillFormWithModel(): void {
  }
}
