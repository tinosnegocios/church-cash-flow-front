import { formatDate } from '@angular/common';
import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ChurchHadler } from 'src/app/handlers/churchHandler';
import { AddressEditModel } from 'src/app/models/EditModels/Address.model';
import { ChurchEditModel } from 'src/app/models/EditModels/churchEdit.model';
import { ChurchReadModel } from 'src/app/models/ReadModels/ChurchRead.models';
import { StringUtil } from 'src/app/models/utils/String.utils';
import { SearchCep } from 'src/app/utils/searchCep.utils';
import { read } from 'xlsx';

@Component({
  selector: 'app-church-register-page',
  templateUrl: './church-register-page.component.html'
})
export class ChurchRegisterPageComponent implements OnInit {
  protected formRegister!: FormGroup;
  protected formSearch!: FormGroup;

  protected msgErros: string[] = [];
  protected msgSuccesss: string[] = [];

  protected searchBusy: boolean = false;

  protected typeSave = "create";
  
  constructor(private fbuilder: FormBuilder, private handler: ChurchHadler) {
    this.formSearch = this.fbuilder.group({
      code: ['', Validators.compose([
        Validators.required
      ])],
    });
    this.formRegister = this.fbuilder.group({
      name: ['ceo carmo', Validators.compose([
        Validators.required,
        Validators.maxLength(100),
        Validators.minLength(4),
      ])],
      acronym: ['cmr', Validators.compose([
        Validators.required,
        Validators.minLength(3),
        Validators.maxLength(4),
      ])],
      inaugurationDate: ['2023-11-15', Validators.compose([
        Validators.required,
      ])],
      registerDate: ['2023-11-15', Validators.compose([
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
      zipCode: ['37470000', Validators.compose([
        Validators.required,
        Validators.minLength(8),
        Validators.maxLength(14)
      ])],
      country: ['brasil', Validators.compose([
        Validators.required,
        Validators.minLength(3)
      ])],
      state: ['minas gerais', Validators.compose([
        Validators.required,
        Validators.minLength(3)
      ])],
      city: ['carmo de minas', Validators.compose([
        Validators.required,
        Validators.minLength(3)
      ])],
      district: ['centro', Validators.compose([
        Validators.required,
        Validators.minLength(3)
      ])],
      street: ['rua projetada', Validators.compose([
        Validators.required,
        Validators.minLength(3)
      ])],
      additional: ['2 andar', Validators.compose([
        Validators.required,
        Validators.minLength(3)
      ])],
      number: ['101', Validators.compose([
        Validators.required
      ])]
    });    
  }

  ngOnInit(): void {
    this.typeSave == "create"
  }  

  protected dashboard(){

  }

  protected async search(){
    const idChurch = this.formSearch.value.code;
    const stringUtil = new StringUtil();
    if(! stringUtil.isNumeric(idChurch))
      return;

    this.searchBusy = true;
    var modelToForm = await this.handler.getChurchById(idChurch);
    
    this.clear();
    
    if (modelToForm.errors!.length > 0) {
      this.searchBusy = false;
      this.msgErros.push("Member not found");
      return;
    }
    const readModel: ChurchReadModel = modelToForm.data;
    this.fillFormWithModel(readModel);

    this.searchBusy = false;
    this.typeSave = "update";
    this.formSearch.controls['code'].setValue(idChurch);
  }

  private fillFormWithModel(readModel: ChurchReadModel){
    console.log(readModel);

    this.formRegister.controls['name'].setValue(readModel.name);
    this.formRegister.controls['acronym'].setValue(readModel.acronym);
    this.formRegister.controls['inaugurationDate'].setValue(formatDate(readModel.inaugurationDate, 'yyyy-MM-dd', 'en'));
    this.formRegister.controls['registerDate'].setValue(formatDate(readModel.registerDate, 'yyyy-MM-dd', 'en'));
    //this.formRegister.controls['firstPastor'].setValue(readModel.firstPastor);
    //this.formRegister.controls['firstPastor'].setValue(readModel.firstPastor);
    //this.formRegister.controls['firstPastor'].setValue(readModel.firstPastor);
    //this.formRegister.controls['firstPastor'].setValue(readModel.firstPastor);
    //this.formRegister.controls['firstPastor'].setValue(readModel.firstPastor);
    //this.formRegister.controls['firstPastor'].setValue(readModel.firstPastor);

    this.formRegister.controls['zipCode'].setValue(readModel.address!.zipCode);
    this.formRegister.controls['additional'].setValue(readModel.address!.additional);
    this.formRegister.controls['city'].setValue(readModel.address!.city);
    this.formRegister.controls['country'].setValue(readModel.address!.country);
    this.formRegister.controls['district'].setValue(readModel.address!.district);
    this.formRegister.controls['number'].setValue(readModel.address!.number);
    this.formRegister.controls['state'].setValue(readModel.address!.state);
    this.formRegister.controls['street'].setValue(readModel.address!.street);
  }

  protected async save(){
    const data = this.formRegister.value;

    var churchEdit = new ChurchEditModel();
    var addressEdit = new AddressEditModel();

    churchEdit.name = this.formRegister.value.name;
    churchEdit.acronym = this.formRegister.value.acronym;
    churchEdit.firstPastorId = this.formRegister.value.firstPastorId != "" ? this.formRegister.value.firstPastorId : 0;
    churchEdit.secondPastorId = this.formRegister.value.secondPastorId != "" ? this.formRegister.value.secondPastorId : 0;
    churchEdit.firstSecretaryId = this.formRegister.value.firstSecretaryId != "" ? this.formRegister.value.firstSecretaryId : 0;
    churchEdit.secondSecretaryId = this.formRegister.value.secondSecretaryId != "" ? this.formRegister.value.secondSecretaryId : 0;
    churchEdit.firstTreasurerId = this.formRegister.value.firstTreasurerId != "" ? this.formRegister.value.firstTreasurerId : 0;
    churchEdit.secondTreasurerId = this.formRegister.value.secondTreasurerId != "" ? this.formRegister.value.secondTreasurerId : 0;
    churchEdit.inaugurationDate = this.formRegister.value.inaugurationDate;
    churchEdit.registerDate = this.formRegister.value.registerDate;
    console.log(churchEdit);

    addressEdit.country = this.formRegister.value.country;
    addressEdit.state = this.formRegister.value.state;
    addressEdit.city = this.formRegister.value.city;
    addressEdit.zipCode = this.formRegister.value.zipCode;
    addressEdit.district = this.formRegister.value.district;
    addressEdit.street = this.formRegister.value.street;
    addressEdit.additional = this.formRegister.value.additional;
    addressEdit.number = parseInt(this.formRegister.value.number);

    if(this.typeSave == "create"){
      await this.create(churchEdit, addressEdit);
    }else if(this.typeSave == "update"){
      await this.update();
    }

  }

  protected async create(churchEdit: ChurchEditModel, addressEdit: AddressEditModel) {
    await this.handler.create(churchEdit, addressEdit)
    .then((result) => {
    })
    .catch((error) => {
      this.msgErros.push("Ocorreu um erro no cadastro. Tente novamente");
    });

    this.msgErros = this.handler.getMsgErro();
    this.msgSuccesss = this.handler.getMsgSuccess();
  }
  protected async update() {
    
  }

  protected clear(){
    this.msgErros = [];
    this.msgSuccesss = [];
    this.handler.clear();
    this.formSearch.reset();
    this.formRegister.reset();    
    this.typeSave = "create";

    //this.memberPhotoUrl = this.cloudService.getImageStore("common", "anonymou-user");
  }

  protected async searchAddressCep(){
    var cep = this.formRegister.value.zipCode;
    const getpCep = await new SearchCep().search(cep);
    
    if(getpCep == null)
      return;

    this.formRegister.controls["city"].setValue(getpCep.city);
    this.formRegister.controls["state"].setValue(getpCep.state);
    this.formRegister.controls["country"].setValue("brasil");
    this.formRegister.controls["street"].setValue(getpCep.street);
  }



}