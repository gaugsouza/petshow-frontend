import { Injectable } from '@angular/core';
import { Observable, of } from 'rxjs';
import { ServicoDetalhado } from 'src/app/interfaces/servico-detalhado';
import { Avaliacao } from 'src/app/interfaces/avaliacao';
import { environment } from 'src/environments/environment';
import { HttpHandlerService } from 'src/app/servicos/http-handler.service';

@Injectable({
  providedIn: 'root'
})
export class AvaliacaoService {
  private AVALIACAO_SERVICE_URL = `${environment.API_URL}/prestador/idPrestador/servico-detalhado/idServico/avaliacao`;
  private SERVICO_DETALHADO_URL = `${environment.API_URL}/prestador/idPrestador/servico-detalhado/idServico`;


  constructor(private httpHandler:HttpHandlerService) {}

  buscaServicoAvaliadoPorId (idServico:number, idPrestador?:number):Observable<ServicoDetalhado> {
    const URL = this.SERVICO_DETALHADO_URL.replace('idPrestador', idPrestador.toString()).replace('idServico', idServico.toString());
    return this.httpHandler.doGet<ServicoDetalhado>(URL);
  }

  adicionarAvaliacao = (avaliacao:Avaliacao, idServico?:number, idPrestador?:number, token?:string):Observable<ServicoDetalhado> => {
    const URL = this.AVALIACAO_SERVICE_URL.replace('idPrestador', idPrestador.toString()).replace('idServico', idServico.toString());
    return this.httpHandler.doPost<ServicoDetalhado>(URL, avaliacao, token);
  }
}
