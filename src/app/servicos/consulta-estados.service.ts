import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { HttpHandlerService } from 'src/app/servicos/http-handler.service';

export interface Estado {
  id:number,
  sigla: string,
  nome: string
}
export interface Cidade {
  id:number,
  nome: string
}
@Injectable({
  providedIn: 'root'
})
export class ConsultaEstadosService {
  private API_BASE_URL = "https://servicodados.ibge.gov.br/api/v1/localidades";
  constructor(private httpHandler:HttpHandlerService){}
  
  getEstados():Observable<any> {
    const URL = `${this.API_BASE_URL}/estados/`;
    return this.httpHandler.doGet<any>(URL);
  }

  getCidades(uf:string):Observable<any>  {
    const URL = `${this.API_BASE_URL}/estados/${uf}/municipios`;
    return this.httpHandler.doGet<any>(URL);
  }
}
