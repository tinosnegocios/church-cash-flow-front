import { Component } from '@angular/core';
import { MeetingHandler } from 'src/app/handlers/meetingKindHandler';
import { MeetingKindReadModel } from 'src/app/models/ReadModels/MeetingKindRead.model';

@Component({
  selector: 'app-meeting-report-page',
  templateUrl: './meeting-report-page.component.html'
})
export class MeetingReportPageComponent {
  protected busy : boolean = false;
  protected msgErrosOffering: string[] = [];
  protected msgSuccesssOffering: string[] = [];
  protected readModel$!: MeetingKindReadModel[];
  protected idHandle: number = 0;
  protected nameHandler : string = "";
  
  constructor(private handler: MeetingHandler) {
        
  }

  async ngOnInit() {  
    await this.dashBoard();
  }

  public async dashBoard(){
    this.busy = true;   

    this.clear();
    
    var result = await this.handler.getAllMeeting();
    if(result.errors != null && result.errors.length > 0){
      this.readModel$ = [];
    }else{
      this.readModel$ = result.data;
    }
    this.busy = false;
  }

  public clear(){

  }

  protected setIdToDelete(eventId: any, eventDescription: string){
    this.idHandle = eventId
    this.nameHandler = eventDescription;
  }
}
