import { Component } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { RegistersPageComponent } from 'src/app/pages/shared/registers-page/registers-page.component';

@Component({
  selector: 'app-secretary-local-register-page',
  templateUrl: './secretary-local-register-page.component.html'
})
export class SecretaryLocalRegisterPageComponent extends RegistersPageComponent {
  protected formRegister!: FormGroup;
  protected formSearch!: FormGroup;

  
  constructor(private fbuilder: FormBuilder) {
    super();
    this.formSearch = this.fbuilder.group({
      code: ['', Validators.compose([
        Validators.required
      ])],
    });
  }

  protected override clearForm(): void {
    throw new Error('Method not implemented.');
  }

  protected clear() {

  }

  protected save() {

  }

  protected dashboard() {

  }

  protected search() {

  }

}
