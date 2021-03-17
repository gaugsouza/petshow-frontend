import { TestBed } from '@angular/core/testing';

import { AvaliacaoService } from './avaliacao.service';
import { ServicoDetalhado } from '../interfaces/servico-detalhado';
import { Avaliacao } from '../interfaces/avaliacao';
import { monica } from '../mocks/usuarioMock';
import { HttpClientTestingModule, HttpTestingController } from '@angular/common/http/testing';
import { LoggerTestingModule } from 'ngx-logger/testing';
import { JwtHelper } from '../util/jwt-helper';
import { HttpHandlerService } from './http-handler.service';
describe('AvaliacaoService', () => {
  let service: AvaliacaoService;
  let httpMock: HttpTestingController;
  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [
        HttpClientTestingModule,
        LoggerTestingModule
      ], providers: [
        JwtHelper
      ]
    });
    service = TestBed.inject(AvaliacaoService);
    // httpMock = TestBed.inject(HttpTestingController);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });

  it('Deve retornar objeto com lista de avaliações', () => {
    let servicoBuscado:ServicoDetalhado;
    service.buscaServicoAvaliadoPorId(1,2).subscribe((el:ServicoDetalhado) => {
      // servicoBuscado = el;
      expect(servicoBuscado).toBeTruthy();
    });
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

    service.adicionarAvaliacao(novaAvaliacao, 1, 2).subscribe(el => {
      expect(el).not.toBeNull();
    });    
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

    service.adicionarAvaliacao(novaAvaliacao, 1, 2).subscribe((servico:ServicoDetalhado) => {
      let avaliacao = servico.avaliacoes.find(avaliacao => avaliacao.id === avaliacaoEsperada.id);
      expect(avaliacao.media).toEqual(avaliacaoEsperada.media)
    });
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
    service.adicionarAvaliacao(novaAvaliacao, 1, 2).subscribe((servico:ServicoDetalhado) => {
      let avaliacao = servico.avaliacoes.find(avaliacao => avaliacao.id === avaliacaoEsperada.id);

    expect(avaliacao.cliente).toEqual(avaliacaoEsperada.cliente);

    });
  });

  describe('Testes unitários', () => {
    let mock:HttpHandlerService;

    beforeEach(() => {
      mock = new HttpHandlerService(null, null, null);

      mock.doGet = jest.fn((url, token) => null);
      mock.doPost = jest.fn((url, body, token) => null);
      mock.doPut = jest.fn((url, body, token) => null);
      mock.doPatch = jest.fn((url, token, body) => null);
      mock.doDelete = jest.fn((url, token) => null);

      service = new AvaliacaoService(mock);
    });

    it('Deve retornar array vazia', () => {
      const retorno = service.getEstrelasAvaliacao(null, '');

      expect(retorno.length).toEqual(0);
    })
    
    it('Deve retornar media de avaliacoes', () => {
      const retorno = service.getMediaAvaliacao([
        {atencao: 1, qualidadeProdutos:1, custoBeneficio:1, infraestrutura:1, qualidadeServico:1, media: 1},
        {atencao: 1, qualidadeProdutos:1, custoBeneficio:1, infraestrutura:1, qualidadeServico:1, media: 1},
        {atencao: 1, qualidadeProdutos:1, custoBeneficio:1, infraestrutura:1, qualidadeServico:1, media: 1},
      ]);

      expect(retorno).toEqual(3);
    });

    it('Deve usar metodo get em buscarAvaliacoesPorServicoDetalhado', () => {
      service.buscarAvaliacoesPorServicoDetalhado(1, 1,1);
      expect(mock.doGet).toHaveBeenCalled();
    })

    it('Deve usar metodo get em buscaServicoAvaliadoPorId', () => {
      service.buscaServicoAvaliadoPorId(1, 1);
      expect(mock.doGet).toHaveBeenCalled();
    })

    it('Deve usar metodo post em adicionarAvaliacao', () => {
      service.adicionarAvaliacao({atencao: 1, qualidadeProdutos:1, custoBeneficio:1, infraestrutura:1, qualidadeServico:1}, 1, 1, '');
      expect(mock.doPost).toHaveBeenCalled();
    });

    it('Deve retornar labels com base em campo', () => {
      const avaliacao = {
        atencao: 1,
        qualidadeProdutos: 1,
        custoBeneficio: 1,
        infraestrutura: 1,
        qualidadeServico: 1
      };

      const esperado = ['star', 'star_border', 'star_border', 'star_border', 'star_border'];

      expect(service.getEstrelasAvaliacao(avaliacao, 'atencao')).toEqual(esperado);
    })

  });
});
