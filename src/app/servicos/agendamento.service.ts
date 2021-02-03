import { Injectable } from '@angular/core';
import { HttpHandlerService } from './http-handler.service';
import { AGENDAMENTO_URL } from '../util/url';
import { Agendamento } from '../interfaces/agendamento';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class AgendamentoService {
  private AGENDAMENTO_SERVICE_URL = `${AGENDAMENTO_URL}`;

  constructor(private httpHandler:HttpHandlerService) { }

  adicionarAgendamento = (agendamento:Agendamento, token:string): Observable<Agendamento> => {
    return this.httpHandler.doPost<Agendamento>(this.AGENDAMENTO_SERVICE_URL, agendamento, token);
  }

  buscarAgendamentosPorCliente = (idCliente:number, pagina:number, quantidadeItens:number, token:string): Observable<any> => {
    const URL = `${this.AGENDAMENTO_SERVICE_URL}/cliente/${idCliente}?pagina=${pagina}&quantidadeItens=${quantidadeItens}`;
    console.log(URL);
    return this.httpHandler.doGet<any>(URL, token);
  }

  buscarAgendamentosPorPrestador = (idPrestador:number, pagina:number, quantidadeItens:number, token:string): Observable<any> => {
    const URL = `${this.AGENDAMENTO_SERVICE_URL}/prestador/${idPrestador}?pagina=${pagina}&quantidadeItens=${quantidadeItens}`;
    return this.httpHandler.doGet<any>(URL, token);
  }

  alterarStatusAgendamento = (idPrestador:number, idStatus:number, idAgendamento:number, token?:string): Observable<any> => {
    const URL = `${this.AGENDAMENTO_SERVICE_URL}/${idAgendamento}/prestador/${idPrestador}/status/${idStatus}`;
    return this.httpHandler.doPatch<any>(URL, token);
  }

  buscarStatusAgendamento = (token?:string): Observable<any> => {
    const URL = `${this.AGENDAMENTO_SERVICE_URL}/statuses`;
    return this.httpHandler.doGet<any>(URL, token);
  }

  buscarAgendamento = (idAgendamento:number, idUsuario:number, token?:string):Observable<any> => {
    const URL = `${this.AGENDAMENTO_SERVICE_URL}/${idAgendamento}/usuario/${idUsuario}`;

    return this.httpHandler.doGet<any>(URL, token);
  }
}
