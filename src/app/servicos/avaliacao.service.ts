import { Injectable } from '@angular/core';
import { Observable, of } from 'rxjs';
import { ServicoDetalhado } from 'src/app/interfaces/servico-detalhado';
import { Avaliacao } from 'src/app/interfaces/avaliacao';
import { HttpHandlerService } from 'src/app/servicos/http-handler.service';
import {AVALIACAO_SERVICE_URL, SERVICO_DETALHADO_URL} from 'src/app/util/url';

@Injectable({
  providedIn: 'root'
})
export class AvaliacaoService {
  constructor(private httpHandler:HttpHandlerService) {}

  buscaServicoAvaliadoPorId (idServico:number, idPrestador?:number):Observable<any> {
    const URL = SERVICO_DETALHADO_URL.replace('idPrestador', idPrestador.toString()).replace('idServico', idServico.toString());
    return this.httpHandler.doGet<any>(URL);
  }

  adicionarAvaliacao = (avaliacao:Avaliacao, idServico?:number, idPrestador?:number, token?:string):Observable<ServicoDetalhado> => {
    const URL = AVALIACAO_SERVICE_URL.replace('idPrestador', idPrestador.toString()).replace('idServico', idServico.toString());
    return this.httpHandler.doPost<ServicoDetalhado>(URL, avaliacao, token);
  }
}
