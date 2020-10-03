import { TestBed } from '@angular/core/testing';

import { AvaliacaoService } from './avaliacao.service';
import { ServicoDetalhado } from '../interfaces/servico-detalhado';
import { Avaliacao } from '../interfaces/avaliacao';
import { monica } from '../mocks/usuarioMock';
import { Servico } from '../interfaces/servico';

describe('AvaliacaoService', () => {
  let service: AvaliacaoService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(AvaliacaoService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });

  it('Deve retornar objeto com lista de avaliações', () => {
    let servicoBuscado:ServicoDetalhado;
    service.buscaServicoAvaliadoPorId(1).subscribe((el:ServicoDetalhado) => {
      servicoBuscado = el;
    });

    expect(servicoBuscado).toBeTruthy();
    expect(servicoBuscado.avaliacoes.length).toBeGreaterThan(0);
  });

  it('Deve adicionar novo objeto a lista de avaliações', () => {
    let novaAvaliacao:Avaliacao = {
      atencao: 5,
      custoBeneficio: 5,
      infraestrutura: 5,
      qualidadeProdutos: 5,
      qualidadeServico: 5,
      comentario: 'Muito bom',
      cliente: {
        id: 1
      },
      servicoAvaliado: {
        id: 1
      },
    }

    let avaliacaoEsperada = {
      ...novaAvaliacao, id: 3, media: 5, cliente: monica
    }

    let servico:ServicoDetalhado;

    service.adicionarAvaliacao(novaAvaliacao).subscribe(el => {
      servico = el
    });
    
    expect(servico.avaliacoes).toContainEqual(avaliacaoEsperada);
  });

  it('Deve receber avaliação nova com média', () => {
    let novaAvaliacao:Avaliacao = {
      atencao: 5,
      custoBeneficio: 5,
      infraestrutura: 5,
      qualidadeProdutos: 5,
      qualidadeServico: 5,
      comentario: 'Muito bom',
      cliente: {
        id: 1
      },
      servicoAvaliado: {
        id: 1
      },
    }

    let avaliacaoEsperada = {
      ...novaAvaliacao, id: 4, media: 5
    }

    let servico:ServicoDetalhado;
    service.adicionarAvaliacao(novaAvaliacao).subscribe((el:ServicoDetalhado) => {
      servico = el;
    });
    let avaliacao = servico.avaliacoes.find(avaliacao => avaliacao.id === avaliacaoEsperada.id);
    expect(avaliacao.media).toEqual(avaliacaoEsperada.media);
  });

  it('Deve retornar cliente completo', () => {
    let novaAvaliacao:Avaliacao = {
      atencao: 5,
      custoBeneficio: 5,
      infraestrutura: 5,
      qualidadeProdutos: 5,
      qualidadeServico: 5,
      comentario: 'Muito bom',
      cliente: {
        id: 1
      },
      servicoAvaliado: {
        id: 1
      },
    }

    let avaliacaoEsperada = {
      ...novaAvaliacao, id: 5, media: 5, cliente: monica
    }
    let servico:ServicoDetalhado;
    service.adicionarAvaliacao(novaAvaliacao).subscribe((el:ServicoDetalhado) => {
      servico = el;
    });

    let avaliacao = servico.avaliacoes.find(avaliacao => avaliacao.id === avaliacaoEsperada.id);

    expect(avaliacao.cliente).toEqual(avaliacaoEsperada.cliente);


  });
});
