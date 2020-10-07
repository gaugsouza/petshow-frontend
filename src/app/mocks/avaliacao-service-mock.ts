import { Cliente } from '../interfaces/cliente';
import { ServicoDetalhado } from '../interfaces/servico-detalhado';
import { usuariosMock } from './usuarioMock';
import { Observable, of } from 'rxjs';
import { Avaliacao } from '../interfaces/avaliacao';
import { servicos } from './servico-detalhado-mock';

export class AvaliacaoServiceMock {
    private clientes:Cliente[] = usuariosMock;
    servicos: ServicoDetalhado[] = [...servicos];
    constructor() { }
  
    buscaServicoAvaliadoPorId = (idServico:number, idPrestador?:number):Observable<ServicoDetalhado> => {
      let servico = this.servicos.find(servico => servico.id === idServico);
      return of(servico);
    }
  
    adicionarAvaliacao = (avaliacao:Avaliacao, idServico?:number, idPrestador?:number):Observable<ServicoDetalhado> => {
      let servico = this.servicos.find(el => el.id === avaliacao.servicoAvaliado.id);
      let avaliador = this.clientes.find(cliente => cliente.id === avaliacao.cliente.id);
      let media = (avaliacao.atencao + avaliacao.custoBeneficio + avaliacao.infraestrutura + avaliacao.qualidadeProdutos + avaliacao.qualidadeServico) / 5;
      servico.avaliacoes.push({...avaliacao, id: servico.avaliacoes.length + 1, media, cliente: avaliador});
      // this.servicos = [...servicos, servico];
      return of(servico);
    }
}