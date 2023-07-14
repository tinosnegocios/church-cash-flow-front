import { DatePipe, formatDate } from '@angular/common';
import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';
import * as moment from 'moment';
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
  protected formSearchTreasury!: FormGroup;

  protected busy = false;
  protected searchBusy = false;
  private auth: AuthService

  protected modelToken: ModelToken;

  protected offeringKind!: ResultViewModel['data'];
  protected offeringKindToSelect!: [string, string][]

  protected meetingKind!: ResultViewModel['data'];
  protected meetingKindToSelect!: [string, string][]

  public offeringKindSelected: string | undefined;
  public meetingKindSelected: string | undefined;

  public msgErrosOffering: string[] = [];
  public msgSuccesssOffering: string = "";

  constructor(private offeringService: OfferingService, private offeringKindService: OfferingKindService, private meetingKindService: MeetingKindService, private fbuilder: FormBuilder) {
    this.auth = new AuthService();
    this.modelToken = this.auth.getModelFromToken();

    this.formSearchTreasury = this.fbuilder.group({
      code: ['']
    });

    this.formTreasury = this.fbuilder.group({
      preacherMemberName: ['', Validators.compose([
        Validators.required,
        Validators.minLength(4),
      ])],
      day: ['', Validators.compose([
        Validators.required,
      ])],
      description: ['', Validators.compose([
        Validators.required,
        Validators.minLength(6),
      ])],
      adultQuantity: ['', Validators.compose([
        Validators.required,
      ])],
      childrenQuantity: ['', Validators.compose([
        Validators.required,
      ])],
      totalPeoples: [''],
      totalAmount: ['', Validators.compose([
        Validators.required,
      ])],
      offeringKindId: ['', Validators.compose([
        Validators.required,
      ])],
      meetingKindId: ['', Validators.compose([
        Validators.required,
      ])],
      resume: ['']
    });
  }

  async ngOnInit() {
    this.msgErrosOffering = [];
    this.msgSuccesssOffering = "";

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

  protected async searchOfferingByCode() {
    this.msgErrosOffering = [];
    this.msgSuccesssOffering = "";

    var code = this.formSearchTreasury.value.code;

    var offeringToForm: ResultViewModel = await this.offeringService.searchOfferingByCode(code);
    this.clearForm();

    if (offeringToForm.errors!.length > 0) {
      console.log("offering not found");
      return;
    }

    this.typeSave = "update";
    var objOffering: Offering = offeringToForm.data;

    var dayConvert = new Date(objOffering.day); // `${objOffering.day.getDay}/${objOffering.day.getMonth}/${objOffering.day.getFullYear}`;
    var dayStr = `${dayConvert.getDate().toString().padStart(2, '0')}/${dayConvert.getMonth().toString().padStart(2, '0')}/${dayConvert.getFullYear()}`
    
    this.formSearchTreasury.controls['code'].setValue(code);
    this.formTreasury.controls['preacherMemberName'].setValue(objOffering.preacherMemberName);
    //this.formTreasury.controls['day'].setValue(dayStr);
    this.formTreasury.controls['day'].setValue(formatDate(objOffering.day,'yyyy-MM-dd','en'));
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

  protected async clearForm() {
    this.msgErrosOffering = [];
    this.msgSuccesssOffering = "";

    this.formTreasury.reset();
    Object.keys(this.formTreasury.controls).forEach(key => {
      this.formTreasury.controls[key].setValue("");
    });
    this.typeSave = "create";
  }

  protected async saveOffering() {
    this.searchBusy = true;
    this.msgErrosOffering = [];
    this.msgSuccesssOffering = "";
    if (this.typeSave == "create") {
      await this.createOffering()
    } else if (this.typeSave == "update") {
      await this.updateOffering();
    }
    this.searchBusy = false;
  }

  private async createOffering() {
    var offering: Offering = this.formTreasury.value;
    
    var result = await this.offeringService.createOffering(offering);
    var msEr: string[];
    if (result!.errors != null && result!.errors.length > 0) {
      result!.errors.forEach(x => {
        this.msgErrosOffering.push(x)
        console.log(this.msgErrosOffering);
      })
    } else {
      this.msgSuccesssOffering = "oferta cadastrada com sucesso"; 
    }
  }
  private async updateOffering() {

  }


  protected sumPeoples() {
    this.formTreasury.controls['totalPeoples'].setValue(this.formTreasury.value.adultQuantity + this.formTreasury.value.childrenQuantity);
  }

  protected showResume() {
    var c = '';
    var z = '';
    if (this.formTreasury.controls['offeringKindId'].value > 0) {
      var i = this.formTreasury.controls['offeringKindId'].value;
      var ii: number = i - 1;
      c = this.offeringKindToSelect[ii][0];
    }

    if (this.formTreasury.controls['meetingKindId'].value > 0) {
      //console.log(this.formTreasury.controls['meetingKindId'].value)
      var y = this.formTreasury.controls['meetingKindId'].value;
      var yy: number = y - 1;
      z = this.meetingKindToSelect![yy][0];
    }

    if (this.formTreasury.valid) {
      var objOffering: Offering = this.formTreasury.value;
      var dayConvert = new Date(objOffering.day);
      var dayStr = `${dayConvert.getDate().toString().padStart(2, '0')}/${dayConvert.getMonth().toString().padStart(2, '0')}/${dayConvert.getFullYear()}`

      var resume = `Culto do dia ${dayStr} com ministração do(a) ${objOffering.preacherMemberName}.
      total de oferta em R$ ${objOffering.totalAmount} com ${objOffering.adultQuantity} adultos e ${objOffering.childrenQuantity} crianças. ofertas sendo ${c}. ${z}`

      this.formTreasury.controls['resume'].setValue(resume);
    }
  }
}
