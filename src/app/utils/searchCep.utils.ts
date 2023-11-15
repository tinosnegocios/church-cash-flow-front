import { Injectable } from "@angular/core";
import { CepModel } from "../models/utils/cep.models";

@Injectable({
    providedIn: 'root'
  })
  
export class SearchCep {
  public async search(cep: string): Promise<CepModel> {
    var cepModel = new CepModel();
  
    try {
      const response = await fetch(`https://brasilapi.com.br/api/cep/v1/${cep}`);
      const json = await response.json();
      cepModel = json;
    } catch (error) {
      console.error('Erro na requisição:', error);
    }
    
    return cepModel;
    
  }
}