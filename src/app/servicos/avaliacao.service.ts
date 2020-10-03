import { Injectable } from '@angular/core';
import { Observable, of } from 'rxjs';
import { ServicoDetalhado } from '../interfaces/servico-detalhado';
import { servicos } from '../mocks/servico-detalhado-mock';
import { Avaliacao } from '../interfaces/avaliacao';
import { Servico } from '../interfaces/servico';
import { Cliente } from '../interfaces/cliente';
import { usuariosMock } from '../mocks/usuarioMock';

@Injectable({
  providedIn: 'root'
})
export class AvaliacaoService {
  private clientes:Cliente[] = usuariosMock;
  servicos: ServicoDetalhado[] = [...servicos];
  constructor() { }

  buscaServicoAvaliadoPorId = (id:number):Observable<ServicoDetalhado> => {
    return of(this.servicos.find(el => el.id === id));
  }

  adicionarAvaliacao = (avaliacao:Avaliacao):Observable<ServicoDetalhado> => {
    let servico = this.servicos.find(el => el.id === avaliacao.servicoAvaliado.id);
    let avaliador = this.clientes.find(cliente => cliente.id === avaliacao.cliente.id);
    let media = (avaliacao.atencao + avaliacao.custoBeneficio + avaliacao.infraestrutura + avaliacao.qualidadeProdutos + avaliacao.qualidadeServico) / 5;
    servico.avaliacoes.push({...avaliacao, id: servico.avaliacoes.length + 1, media, cliente: avaliador});
    // this.servicos = [...servicos, servico];
    return of(servico);
  }
}
