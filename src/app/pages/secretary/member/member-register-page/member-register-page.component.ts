import { formatDate } from '@angular/common';
import { Component, OnInit} from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { PostHandler } from 'src/app/handlers/PostHandler';
import { MemberHandler } from 'src/app/handlers/memberHandler';
import { MemberEditModel } from 'src/app/models/EditModels/MemberEdit.models';
import { MemberReadModel } from 'src/app/models/ReadModels/MemberRead.models';
import { PostReadModel } from 'src/app/models/ReadModels/PostRead.models';
import { ResultViewModel } from 'src/app/models/resultViewModel.models';

@Component({
  selector: 'app-member-register-page',
  templateUrl: './member-register-page.component.html'
})
export class MemberRegisterPageComponent implements OnInit {
  private post!: ResultViewModel['data'];
  private PostIdSelected: number[] = [];
  
  protected typeSave = "create";
  protected formMember!: FormGroup;
  protected formSearch!: FormGroup;
  protected postToSelect!: [string, string][];
  protected msgErros: string[] = [];
  protected msgSuccesss: string[] = [];
  protected searchBusy: boolean = false;
  protected memberIsValid: boolean = false;

  constructor(private fbuilder: FormBuilder, private handler: MemberHandler, private postHandler: PostHandler) {
    this.formMember = this.fbuilder.group({
      name: ['', Validators.compose([
        Validators.required, ,
      ])],
      dateBirth: ['', Validators.compose([
        Validators.required,
      ])],
      description: ['', Validators.compose([
        Validators.maxLength(100),
      ])],
      photo: ['', Validators.compose([
      ])],
      dateRegister: ['', Validators.compose([
        Validators.required,
      ])],
      dateBaptism: ['', Validators.compose([
      ])],
      posts: []
    });

    this.formSearch = this.fbuilder.group({
      code: ['', Validators.compose([
        Validators.required
      ])],
    });
  }

  async ngOnInit() {
    await this.dashBoard();
  }

  async dashBoard(){
    await this.loadPosts();
  }

  async searchByCode(code: string = ""){
    this.searchBusy = true;
    
    if (code.length <= 0)
      code = this.formSearch.value.code;

    var modelToForm: ResultViewModel = await this.handler.getByCode(code);

    this.clear();
    
    if (modelToForm.errors!.length > 0) {
      this.searchBusy = false;
      this.msgErros.push("Member not found");
      return;
    }

    this.typeSave = "update";
    var objModel: MemberReadModel = modelToForm.data;

    this.fillFormWithModel(objModel, code);

    this.memberIsValid = objModel.active;
    this.searchBusy = false;
    this.typeSave = "update";
    this.formSearch.controls['code'].setValue(code);
  }

  private fillFormWithModel(model: MemberReadModel, code: string) {
    console.log(model);
    
    this.formMember.controls['dateBirth'].setValue(formatDate(model.dateBirth, 'yyyy-MM-dd', 'en'));
    this.formMember.controls['dateRegister'].setValue(formatDate(model.dateRegister, 'yyyy-MM-dd', 'en'));
    this.formMember.controls['dateBaptism'].setValue(formatDate(model.dateBaptism, 'yyyy-MM-dd', 'en'));
    this.formMember.controls['name'].setValue(model.name);
    this.formMember.controls['description'].setValue(model.description);
  }

  protected async loadPosts() {
    try {
      const dados = await this.postHandler.getPosts();
      this.post = dados.data;
      const meuObjeto: Record<string, string> = {};

      this.post.forEach((x: PostReadModel) => {

        var key = x.name;
        var value = x.id

        meuObjeto[key] = `${value}`;
      });

      this.postToSelect = Object.entries(meuObjeto);
      
    } catch (error) {
      console.log('error to get Posts:', error);
    }
  }

  protected setPostId(id: string){
    var idNumber: number = 0;
    try{
      idNumber = parseInt(id);
    }catch{
      console.log("Cannot converter the id for number. The value is invalid");
    }

    var index = this.PostIdSelected.indexOf(idNumber);
    if(index >= 0){
      var newListId = this.PostIdSelected.filter(x => x !== idNumber);
      this.PostIdSelected = newListId;
    }else{
      this.PostIdSelected.push(idNumber);
    }
  }

  protected clear(): void {
    this.msgErros = [];
    this.msgSuccesss = [];
    this.PostIdSelected = [];
    this.handler.clear();
    this.formMember.reset();
    this.formSearch.reset();
  }

  protected save(): void {
    this.searchBusy = true;

    var member: MemberEditModel = this.formMember.value;
    member.postIds = this.PostIdSelected;
    this.create(member);

    this.searchBusy = false;
  }

  private async create(model: MemberEditModel) {
    await this.handler.create(model)
    .then((result) => {
    })
    .catch((error) => {
      this.msgErros.push("Ocorreu um erro no cadastro. Tente novamente");
    });

    this.msgErros = this.handler.getMsgErro();
    this.msgSuccesss = this.handler.getMsgSuccess();
  }

  private async update(model: MemberEditModel) {
    await this.handler.update(model)
    .then((result) => {
    })
    .catch((error) => {
      this.msgErros.push("Ocorreu um erro no cadastro. Tente novamente");
    });

    this.msgErros = this.handler.getMsgErro();
    this.msgSuccesss = this.handler.getMsgSuccess();
  }
}
