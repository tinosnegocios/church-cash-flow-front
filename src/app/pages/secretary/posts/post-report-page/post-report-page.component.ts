import { Component } from '@angular/core';
import { PostHandler } from 'src/app/handlers/PostHandler';
import { PostReadModel } from 'src/app/models/ReadModels/PostRead.models';
import { ExcelMethods } from 'src/app/utils/excelMethods.utils';

@Component({
  selector: 'app-post-report-page',
  templateUrl: './post-report-page.component.html'
})
export class PostReportPageComponent {
  protected busy : boolean = false;
  protected msgErrosOffering: string[] = [];
  protected msgSuccesssOffering: string[] = [];
  protected readModel$!: PostReadModel[];
  protected idHandle: number = 0;
  protected nameHandler : string = "";
  private excelMethod: ExcelMethods;
  
  constructor(private handler: PostHandler) {
    this.excelMethod = new ExcelMethods();
  }

  async ngOnInit() {  
    await this.dashBoard();
  }

  public async dashBoard(){
    this.busy = true;   

    this.clear();
    
    var result = await this.handler.getPosts();
    if(result.errors != null && result.errors.length > 0){
      this.readModel$ = [];
    }else{
      this.readModel$ = result.data;
    }
    this.busy = false;
  }

  public clear(){
    this.idHandle = 0;
    this.nameHandler = "";
    this.msgErrosOffering = [];
    this.msgSuccesssOffering = [];
  }

  protected delete(){
    if(this.idHandle > 0){
      var result = this.handler.delete(this.idHandle)
      .then((result) => {
        this.dashBoard();
        this.msgErrosOffering = this.handler.getMsgErro();
        this.msgSuccesssOffering = this.handler.getMsgSuccess();
      })
      .catch((error) => {
        console.log(error);
      });
    }
  }

  protected setIdToDelete(eventId: any, eventDescription: string){
    this.idHandle = eventId
    this.nameHandler = eventDescription;
  }

  protected exportarExcel(){
    try{
      let element = document.getElementById('excel-table'); 
      var fileName = `relatorio-de-cargo`;
      this.excelMethod.exportExcel(element, fileName);

      this.msgSuccesssOffering.push("arquivo excel exportado. confira sua pasta de download");
    }catch{
      this.msgErrosOffering.push("Ocorreu um erro ao gerar o arquivo. tente novamente");
    }
  }
}
