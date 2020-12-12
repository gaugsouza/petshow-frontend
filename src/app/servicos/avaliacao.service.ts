import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { ServicoDetalhado } from 'src/app/interfaces/servico-detalhado';
import { Avaliacao } from 'src/app/interfaces/avaliacao';
import { HttpHandlerService } from 'src/app/servicos/http-handler.service';
import { AVALIACAO_SERVICE_URL, PRESTADOR_SERVICO_DETALHADO, SERVICO_AVALIADO_URL } from 'src/app/util/url';

@Injectable({
  providedIn: 'root',
})
export class AvaliacaoService {
  private AVALIACOES_SERVICE_URLS = `${SERVICO_AVALIADO_URL}?pagina=valorPagina&quantidadeItens=valorQuantidadeItens`;

  constructor(private httpHandler:HttpHandlerService) {}

  buscarAvaliacoesPorServicoDetalhado(idServico:number, pagina:number, quantidadeItens:number):
  Observable<any> {
    const URL = this.AVALIACOES_SERVICE_URLS.replace('idServico', idServico.toString())
      .replace('valorPagina', pagina.toString())
      .replace('valorQuantidadeItens', quantidadeItens.toString());
    return this.httpHandler.doGet<any>(URL);
  }

  buscaServicoAvaliadoPorId(idServico:number, idPrestador?:number): Observable<any> {
    const BASE_URL = PRESTADOR_SERVICO_DETALHADO.replace('idPrestador', idPrestador.toString());
    const URL = `${BASE_URL}/${idServico}`;
    return this.httpHandler.doGet<any>(URL);
  }

  adicionarAvaliacao = (avaliacao:Avaliacao, idServico?:number, idPrestador?:number, token?:string):
  Observable<ServicoDetalhado> => {
    const URL = AVALIACAO_SERVICE_URL.replace('idPrestador', idPrestador.toString()).replace('idServico', idServico.toString());
    return this.httpHandler.doPost<ServicoDetalhado>(URL, avaliacao, token);
  }
}
