import { Component } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { RegistersPageComponent } from 'src/app/pages/shared/registers-page/registers-page.component';

@Component({
  selector: 'app-meeting-register-page',
  templateUrl: './meeting-register-page.component.html'
})
export class MeetingRegisterPageComponent extends RegistersPageComponent {
  public formSearch!: FormGroup;
  public formPrincipal!: FormGroup;

  constructor(private fbuilder: FormBuilder) {
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
    
  }

  protected formSearchTreasury!: FormGroup;


  public dashBoard(): void{

  }

  protected async searchByCode(code: number = 0) {

  }

  protected async save(): Promise<void>{
    console.log('salvando');
    console.log(this.formPrincipal.value);
  }

}
