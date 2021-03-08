import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { HttpHandlerService } from 'src/app/servicos/http-handler.service';

export interface Estado {
  id:string,
  sigla?: string,
  estado: string
}
export interface Cidade {
  estadoId:string,
  cidade: string
}
@Injectable({
  providedIn: 'root',
})
export class ConsultaEstadosService {
  private API_BASE_URL = 'https://br-cidade-estado-nodejs.glitch.me';

  constructor(private httpHandler:HttpHandlerService) {}

  getEstados():Observable<any> {
    const URL = `${this.API_BASE_URL}/estados/`;
    return this.httpHandler.doGet<any>(URL);
  }

  getCidades(uf:string):Observable<any> {
    const URL = `${this.API_BASE_URL}/estados/${uf}/cidades`;
    return this.httpHandler.doGet<any>(URL);
  }
}
