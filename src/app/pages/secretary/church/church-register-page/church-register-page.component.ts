import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { AddressEditModel } from 'src/app/models/EditModels/Address.model';
import { ChurchAddress } from 'src/app/models/EditModels/ChurchAddress.model';
import { ChurchEditModel } from 'src/app/models/EditModels/churchEdit.model';
import { SearchCep } from 'src/app/utils/searchCep.utils';

@Component({
  selector: 'app-church-register-page',
  templateUrl: './church-register-page.component.html'
})
export class ChurchRegisterPageComponent implements OnInit {
  protected formRegister!: FormGroup;
  protected formSearch!: FormGroup;

  protected typeSave = "create";
  
  constructor(private fbuilder: FormBuilder) {
    this.formSearch = this.fbuilder.group({
      code: ['', Validators.compose([
        Validators.required
      ])],
    });
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
      cep: ['', Validators.compose([
        Validators.required,
        Validators.minLength(8),
        Validators.maxLength(14)
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

  protected async save(){
    const data = this.formRegister.value;
    console.log(data);

    var churchEdit = new ChurchEditModel();
    var addressEdit = new AddressEditModel();

    churchEdit.name = this.formRegister.value.name;
    churchEdit.acronym = this.formRegister.value.acronym;
    churchEdit.firstPastorId = this.formRegister.value.firstPastorId;
    churchEdit.secondPastorId = this.formRegister.value.secondPastorId;
    churchEdit.firstSecretaryId = this.formRegister.value.firstSecretaryId;
    churchEdit.SecondSecretaryId = this.formRegister.value.SecondSecretaryId;
    churchEdit.firstTreasurerId = this.formRegister.value.firstTreasurerId;
    churchEdit.secondTreasurerId = this.formRegister.value.secondTreasurerId;

    addressEdit.country = this.formRegister.value.country;
    addressEdit.state = this.formRegister.value.state;
    addressEdit.city = this.formRegister.value.city;
    addressEdit.zipCode = this.formRegister.value.zipCode;
    addressEdit.district = this.formRegister.value.district;
    addressEdit.street = this.formRegister.value.street;
    addressEdit.additional = this.formRegister.value.additional;
    addressEdit.number = this.formRegister.value.number;

    const churchAdd = new ChurchAddress(churchEdit, addressEdit);    

    if(this.typeSave == "create"){
      await this.create(churchAdd);
    }else if(this.typeSave == "update"){
      await this.update(churchAdd);
    }

  }

  protected async create(churchEdit: ChurchAddress) {
    console.log(churchEdit);
  }
  protected async update(churchEdit: ChurchAddress) {
    console.log(churchEdit);
  }

  protected clear(){

  }

  protected async searchAddressCep(){
    var cep = this.formRegister.value.cep;
    const getpCep = await new SearchCep().search(cep);
    
    if(getpCep == null)
      return;

    this.formRegister.controls["city"].setValue(getpCep.city);
    this.formRegister.controls["state"].setValue(getpCep.state);
    this.formRegister.controls["country"].setValue("brasil");
    this.formRegister.controls["street"].setValue(getpCep.street);
  }



}
