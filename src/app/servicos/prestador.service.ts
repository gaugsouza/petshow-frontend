import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { Prestador } from 'src/app/interfaces/prestador';
import { ServicoDetalhado } from 'src/app/interfaces/servico-detalhado';
import { HttpHandlerService } from 'src/app/servicos/http-handler.service';
import { PRESTADOR_SERVICE_URL, PRESTADOR_SERVICO_DETALHADO } from 'src/app/util/url';

@Injectable({
  providedIn: 'root',
})
export class PrestadorService {
  constructor(private httpHandler:HttpHandlerService) {}

  buscaPrestador(id:number, token?:string): Observable<any> {
    const URL = `${PRESTADOR_SERVICE_URL}/${id}`;
    return this.httpHandler.doGet<any>(URL, token);
  }

  adicionarServico(id:number, servico:ServicoDetalhado, token:string):
  Observable<ServicoDetalhado> {
    const URL = `${PRESTADOR_SERVICO_DETALHADO}`.replace('idPrestador', id.toString());
    return this.httpHandler.doPost<ServicoDetalhado>(URL, servico, token);
  }

  editaPrestador(id:number, prestador:Prestador, token:string): Observable<Prestador> {
    const URL = `${PRESTADOR_SERVICE_URL}/${id}`;
    return this.httpHandler.doPut<Prestador>(URL, prestador, token);
  }

  removeServico = (id:number, idServico:number, token:string): Observable<any> => {
    const URL_SERVICO_BASE = PRESTADOR_SERVICO_DETALHADO.replace('idPrestador', id.toString());
    const URL = `${URL_SERVICO_BASE}/${idServico}`;
    return this.httpHandler.doDelete<Prestador>(URL, token);
  }
}
