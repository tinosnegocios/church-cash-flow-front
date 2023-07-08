import { Component, OnInit } from '@angular/core';
import { ModelToken } from 'src/app/models/ModelToken.models';
import { MeetingKind } from 'src/app/models/meetingKind.models copy';
import { OfferingKind } from 'src/app/models/offeringKind.models';
import { ResultViewModel } from 'src/app/models/resultViewModel.models';
import { AuthService } from 'src/app/services/auth.services';
import { MeetingKindService } from 'src/app/services/meetingKind.services';
import { OfferingKindService } from 'src/app/services/offeringKind.services';

@Component({
  selector: 'app-treasury-registe-page',
  templateUrl: './treasury-register-page.component.html'
})
export class treasuryRegisterPageComponent implements OnInit {

  protected busy = false;
  private auth: AuthService

  protected modelToken : ModelToken;

  protected offeringKind!: ResultViewModel['data'];
  protected offeringKindToSelect!:  [string, string][]

  protected meetingKind!: ResultViewModel['data'];
  protected meetingKindToSelect!:  [string, string][]

  public offeringKindSelected: string | undefined;
  public meetingKindSelected: string | undefined;

  constructor(private offeringKindService: OfferingKindService, private meetingKindService: MeetingKindService) {
    this.auth = new AuthService();
    this.modelToken = this.auth.getModelFromToken();
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

}
