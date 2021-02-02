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
  private NOTA_MAXIMA = 5;

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

  adicionarAvaliacao = (avaliacao:Avaliacao, idServico?:number, idAgendamento?:number, token?:string):
  Observable<Avaliacao> => {
    const URL = AVALIACAO_SERVICE_URL.replace('idPrestador/', "")
                                     .replace('idServico', idServico.toString())
                                     .replace('idAgendamento', idAgendamento.toString());
    return this.httpHandler.doPost<Avaliacao>(URL, avaliacao, token);
  }

  getEstrelasAvaliacao = (avaliacao:Avaliacao, campo:string):string[] => {
    if (!avaliacao) {
      return [];
    }
    const nota = avaliacao[campo];
    const estrelasEmBranco = this.NOTA_MAXIMA - nota;
    const estrelas:any[string] = [
      [...Array(nota).keys()].map(() => 'star'),
      [...Array(estrelasEmBranco).keys()].map(() => 'star_border'),
    ];
    return estrelas.flatMap((el:any) => el);
  }
}
