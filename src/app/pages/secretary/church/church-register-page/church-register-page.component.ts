import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';

@Component({
  selector: 'app-church-register-page',
  templateUrl: './church-register-page.component.html'
})
export class ChurchRegisterPageComponent implements OnInit {
  protected formRegister!: FormGroup;
  protected formSearch!: FormGroup;

  
  
  constructor(private fbuilder: FormBuilder) {
    this.formRegister = this.fbuilder.group({
      name: ['', Validators.compose([
        Validators.required,
        Validators.maxLength(100),
        Validators.minLength(4),
      ])],
      acronym: ['', Validators.compose([
        Validators.required,
        Validators.minLength(3),
        Validators.maxLength(4),
      ])],
      dateRegister: ['', Validators.compose([
        Validators.required,
      ])],
      dateInauguration: ['', Validators.compose([
        Validators.required,
      ])],
      firstPastorId: ['', Validators.compose([
        Validators.required,
      ])],
      secondPastorId: ['', Validators.compose([
        Validators.required,
      ])],
      firstTreasurerId: ['', Validators.compose([
        Validators.required,
      ])],
      secondTreasurerId: ['', Validators.compose([
        Validators.required,
      ])],
      firstSecretaryId: ['', Validators.compose([
        Validators.required,
      ])],
      secondSecretaryId: ['', Validators.compose([
        Validators.required,
      ])],
      country: ['', Validators.compose([
        Validators.required,
        Validators.minLength(3)
      ])],
      state: ['', Validators.compose([
        Validators.required,
        Validators.minLength(3)
      ])],
      city: ['', Validators.compose([
        Validators.required,
        Validators.minLength(3)
      ])],
      district: ['', Validators.compose([
        Validators.required,
        Validators.minLength(3)
      ])],
      street: ['', Validators.compose([
        Validators.required,
        Validators.minLength(3)
      ])],
      additional: ['', Validators.compose([
        Validators.required,
        Validators.minLength(3)
      ])],
      number: ['', Validators.compose([
        Validators.required
      ])]
    });    
  }

  ngOnInit(): void {
    
  }  

  protected dashboard(){

  }

  protected save(){
    const data = this.formRegister.value;
    console.log(data);
  }

  protected clear(){

  }



}
