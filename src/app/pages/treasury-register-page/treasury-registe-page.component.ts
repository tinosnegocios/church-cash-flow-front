import { DatePipe } from '@angular/common';
import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';
import { ModelToken } from 'src/app/models/ModelToken.models';
import { MeetingKind } from 'src/app/models/meetingKind.models copy';
import { Offering } from 'src/app/models/offering.models';
import { OfferingKind } from 'src/app/models/offeringKind.models';
import { ResultViewModel } from 'src/app/models/resultViewModel.models';
import { AuthService } from 'src/app/services/auth.services';
import { MeetingKindService } from 'src/app/services/meetingKind.services';
import { OfferingService } from 'src/app/services/offering.services';
import { OfferingKindService } from 'src/app/services/offeringKind.services';

@Component({
  selector: 'app-treasury-registe-page',
  templateUrl: './treasury-register-page.component.html'
})
export class treasuryRegisterPageComponent implements OnInit {
  protected typeSave = "create";
  protected formTreasury!: FormGroup;
  
  protected busy = false;
  private auth: AuthService

  protected modelToken : ModelToken;

  protected offeringKind!: ResultViewModel['data'];
  protected offeringKindToSelect!:  [string, string][]

  protected meetingKind!: ResultViewModel['data'];
  protected meetingKindToSelect!:  [string, string][]

  public offeringKindSelected: string | undefined;
  public meetingKindSelected: string | undefined;

  constructor(private offeringService: OfferingService, private offeringKindService: OfferingKindService, private meetingKindService: MeetingKindService, private fbuilder: FormBuilder) {
    this.auth = new AuthService();
    this.modelToken = this.auth.getModelFromToken();

    this.formTreasury = this.fbuilder.group({
      preacherMemberName: ['',Validators.compose([
        Validators.required,
        Validators.minLength(4),
      ])],
      day: ['',Validators.compose([
        Validators.required,
      ])],
      description: ['',Validators.compose([
        Validators.required,
        Validators.minLength(6),
      ])],
      adultQuantity: ['0',Validators.compose([
        Validators.required,
      ])],
      childrenQuantity: ['0',Validators.compose([
        Validators.required,
      ])],
      totalPeoples: ['0'],
      totalAmount: ['',Validators.compose([
        Validators.required,
      ])],
      offeringKindId: ['',Validators.compose([
        Validators.required,
      ])],
      meetingKindId: ['',Validators.compose([
        Validators.required,
      ])],
      resume: [''],
      code: [''],
    });
  }

  async ngOnInit() {
    this.busy = true;
    await this.dashBoard();
    this.busy = false;
  }

  public async dashBoard() {

    //get offering-kind
    try {
      const dados = await this.offeringKindService.getOfferingKind();
      this.offeringKind = dados;
      const meuObjeto: Record<string, string> = {};

      this.offeringKind.forEach((x: OfferingKind) => {

        var key = x.name;
        var value = x.id

        meuObjeto[key] = `${value}`;
      });
      this.offeringKindToSelect = Object.entries(meuObjeto);

    } catch (error) {
      console.log('error to get offering-kind:', error);
    }

    //get meeting-kind
    try {
      const dados = await this.meetingKindService.getMeetingKind();
      this.meetingKind = dados;
      const meuObjeto: Record<string, string> = {};

      this.meetingKind.forEach((x: MeetingKind) => {

        var key = x.name;
        var value = x.id

        meuObjeto[key] = `${value}`;
      });
      this.meetingKindToSelect = Object.entries(meuObjeto);

    } catch (error) {
      console.log('error to get offering-kind:', error);
    }

  }

  protected async searchOfferingByCode(){
    var code = this.formTreasury.value.code;

    var offeringToForm : ResultViewModel = await this.offeringService.searchOfferingByCode(code);
    this.clearForm();

    if(offeringToForm.errors!.length > 0){
      console.log("offering not found");
      return;
    }

    this.typeSave = "update";
    var objOffering: Offering = offeringToForm.data;

    var dayConvert = new Date(objOffering.day); // `${objOffering.day.getDay}/${objOffering.day.getMonth}/${objOffering.day.getFullYear}`;
    var dayStr = `${dayConvert.getDate().toString().padStart(2, '0') }/${dayConvert.getMonth().toString().padStart(2, '0') }/${dayConvert.getFullYear()}`

    this.formTreasury.controls['code'].setValue(code);
    this.formTreasury.controls['preacherMemberName'].setValue(objOffering.preacherMemberName);
    this.formTreasury.controls['day'].setValue(dayStr);
    this.formTreasury.controls['description'].setValue(objOffering.description);
    this.formTreasury.controls['adultQuantity'].setValue(objOffering.adultQuantity);
    this.formTreasury.controls['totalPeoples'].setValue((objOffering.adultQuantity + objOffering.childrenQuantity));
    this.formTreasury.controls['childrenQuantity'].setValue(objOffering.childrenQuantity);
    this.formTreasury.controls['totalAmount'].setValue(objOffering.totalAmount);
    this.formTreasury.controls['offeringKindId'].setValue(objOffering.offeringKindId);
    this.formTreasury.controls['meetingKindId'].setValue(objOffering.meetingKindId);

    var resume = `Culto do dia ${dayStr} com ministração do(a) ${objOffering.preacherMemberName}.
    total de oferta em R$ ${objOffering.totalAmount} com ${objOffering.adultQuantity} adultos e ${objOffering.childrenQuantity} crianças. ofertas sendo ${objOffering.offeringKind}. ${objOffering.meetingKind}`

    this.formTreasury.controls['resume'].setValue(resume);
  }

  protected async clearForm(){
    this.formTreasury.reset();
    Object.keys(this.formTreasury.controls).forEach(key => {
      this.formTreasury.controls[key].setValue("");
    });
    this.typeSave = "create";
  }

  protected async saveOffering(){
    if(this.typeSave == "create"){
      await this.createOffering()
    }else if(this.typeSave == "update") {
      await this.updateOffering();
    }
    console.log('salvando oferta');
  }

  private async createOffering(){
    console.log(this.formTreasury.value);
  }
  private async updateOffering(){

  }


  protected sumPeoples() {
    this.formTreasury.value.controls['totalPeoples'].setValue(90);
  }
}
