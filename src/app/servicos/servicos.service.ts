import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { HttpHandlerService } from 'src/app/servicos/http-handler.service';
import { SERVICO_DETALHADO_URL, TIPO_SERVICO_URL, PRESTADOR_SERVICE_URL } from 'src/app/util/url';
import { FiltroServicos } from '../interfaces/filtro-servicos';
import { Adicional } from '../interfaces/adicional';
import { ServicoDetalhadoTipoAnimal } from '../interfaces/servico-detalhado-tipo-animal';
import { Cidade } from './consulta-estados.service';

@Injectable({
  providedIn: 'root',
})
export class ServicosService {
  constructor(private httpHandler:HttpHandlerService) {}

  getTipos(): Observable<any> {
    const URL = TIPO_SERVICO_URL;
    return this.httpHandler.doGet<any>(URL);
  }

  getTiposPorCidade(cidade:Cidade) {
    const URL = `${TIPO_SERVICO_URL}?estado=${cidade.estadoId}&cidade=${cidade.cidade}`;
    return this.httpHandler.doGet<any>(URL);
  }

  buscarServicosDetalhadosPorTipo = (filtro:FiltroServicos, pagina:number, quantidadeItens:number)
  : Observable<any> => {
    const URL = `${SERVICO_DETALHADO_URL}/filtro?pagina=${pagina}&quantidadeItens=${quantidadeItens}`;
    return this.httpHandler.doPost<any>(URL, filtro);
  }

  buscarServicosDetalhadosPorPrestador(prestadorId:number, pagina:number,
    quantidadeItens:number, token:string) : Observable<any> {
    const URL = `${PRESTADOR_SERVICE_URL}/${prestadorId}/servico-detalhado?pagina=${pagina}&quantidadeItens=${quantidadeItens}`;
    return this.httpHandler.doGet<any>(URL, token);
  }

  buscarPorPrestadorIdEServicoId = (prestadorId:number, servicoDetalhadoId:number, token?:string)
    : Observable<any> => {
    const URL = `${PRESTADOR_SERVICE_URL}/${prestadorId}/servico-detalhado/${servicoDetalhadoId}`;
    return this.httpHandler.doGet<any>(URL, token);
  }

  buscarServicosComparacao(ids:number[], token?:string) {
    const URL = `${SERVICO_DETALHADO_URL}?ids=${ids.join()}`;
    return this.httpHandler.doGet<any>(URL, token);
  }

  adicionarAdicional(prestadorId:number, servicoDetalhadoId:number, adicional:Adicional,
    token:string) {
    const URL = `${PRESTADOR_SERVICE_URL}/${prestadorId}/servico-detalhado/${servicoDetalhadoId}/adicional`;
    return this.httpHandler.doPost<any>(URL, adicional, token);
  }

  atualizarAdicional(prestadorId:number, servicoDetalhadoId:number,
    adicionalId:number, adicional:Adicional, token:string) : Observable<any> {
    const URL = `${PRESTADOR_SERVICE_URL}/${prestadorId}/servico-detalhado/${servicoDetalhadoId}/adicional/${adicionalId}`;
    return this.httpHandler.doPut<any>(URL, adicional, token);
  }

  desativarAdicional(prestadorId:number, servicoDetalhadoId:number,
    adicionalId:number, ativo: boolean, token:string) {
    const URL = `${PRESTADOR_SERVICE_URL}/${prestadorId}/servico-detalhado/${servicoDetalhadoId}/adicional/${adicionalId}?ativo=${ativo}`;
    return this.httpHandler.doPatch<any>(URL, token);
  }

  adicionarTipoAnimalAceito(prestadorId:number, servicoDetalhadoId:number,
    tipoAnimalId:number, servicoDetalhadoTipoAnimal: ServicoDetalhadoTipoAnimal,
    token:string) : Observable<any> {
    const URL = `${PRESTADOR_SERVICE_URL}/${prestadorId}/servico-detalhado/${servicoDetalhadoId}/tipoAnimalAceito/tipoAnimal/${tipoAnimalId}`;
    return this.httpHandler.doPost<any>(URL, servicoDetalhadoTipoAnimal, token);
  }

  atualizarTipoAnimalAceito(prestadorId:number, servicoDetalhadoId:number,
    tipoAnimalId:number, servicoDetalhadoTipoAnimal:
    ServicoDetalhadoTipoAnimal, token:string) : Observable<any> {
    const URL = `${PRESTADOR_SERVICE_URL}/${prestadorId}/servico-detalhado/${servicoDetalhadoId}/tipoAnimalAceito/tipoAnimal/${tipoAnimalId}`;
    return this.httpHandler.doPut<any>(URL, servicoDetalhadoTipoAnimal, token);
  }

  buscarServicosGeoloc = (filtro:FiltroServicos) : Observable<any> => {
    const URL = `${SERVICO_DETALHADO_URL}/geoloc`;
    return this.httpHandler.doPost<any>(URL, filtro);
  }

  atualizarServicoDetalhado = (prestadorId: number,
    servicoDetalhadoId:number, ativo:boolean, token:string) : Observable<any> => {
    const URL = `${PRESTADOR_SERVICE_URL}/${prestadorId}/servico-detalhado/${servicoDetalhadoId}?ativo=${ativo}`;
    return this.httpHandler.doPatch<any>(URL, token);
  }
}
