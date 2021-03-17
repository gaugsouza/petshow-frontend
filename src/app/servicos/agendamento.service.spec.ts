import { HttpClientTestingModule } from '@angular/common/http/testing';
import { TestBed } from '@angular/core/testing';
import { LoggerTestingModule } from 'ngx-logger/testing';
import { Observable, of } from 'rxjs';
import { JwtHelper } from '../util/jwt-helper';

import { AgendamentoService } from './agendamento.service';
import { HttpHandlerService } from './http-handler.service';
jest.mock('./http-handler.service')
const httpHandler = new HttpHandlerService(null, null, null);


describe('AgendamentoService', () => {
  let service: AgendamentoService;

  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [
        HttpClientTestingModule,
        LoggerTestingModule
      ], providers: [
        JwtHelper
      ]
    });
    service = TestBed.inject(AgendamentoService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });

  it('Deve retornar horarios para domingo', () => {
    let esperado = ['09:00', '11:00', '12:00'];
    let dia = new Date('02 07 2021');
    let horarios = ['10:00'];
    let retorno = service.getHorariosDisponiveis(horarios, dia);

    expect(retorno).toEqual(esperado);
  });

  it('Deve retornar horários para outro dia da semana', () => {
    let esperado = ['09:00', '11:00', '12:00', '13:00', '14:00', '15:00', '16:00','17:00', '18:00'];
    let dia = new Date('02 08 2021');
    let horarios = ['10:00'];
    let retorno = service.getHorariosDisponiveis(horarios, dia);

    expect(retorno).toEqual(esperado);
  });

  describe('Testes dos services', () => {
    let mock:HttpHandlerService;
    beforeEach(() => {
      mock = new HttpHandlerService(null, null, null);

      mock.doGet = jest.fn((url, token) => null);
      mock.doPost = jest.fn((url, body, token) => null);
      mock.doPut = jest.fn((url, body, token) => null);
      mock.doPatch = jest.fn((url, token, body) => null);
      mock.doDelete = jest.fn((url, token) => null);

      service = new AgendamentoService(mock);
    });

    it('Deve chamar metodo post de handler', () => {
      service.adicionarAgendamento({}, '');

      expect(mock.doPost).toHaveBeenCalled();
    });

    it('Deve chamar metodo get do handler', () => {
      service.buscarAgendamentosPorCliente(1, 1, 1, '');
      expect(mock.doGet).toHaveBeenCalledTimes(1);
    });

    it('Deve chamar metodo get do handler para agendamentos-prestador', () => {
      service.buscarAgendamentosPorPrestador(1, 1, 1, '');
      expect(mock.doGet).toHaveBeenCalledTimes(1);
    });

    it('Deve chamar metodo patch do handler', () => {
      service.alterarStatusAgendamento(1, 1, 1, '');
      expect(mock.doPatch).toHaveBeenCalledTimes(1);
    });

    it('Deve chamar método get em buscar status', () => {
      service.buscarStatusAgendamento('');
      expect(mock.doGet).toHaveBeenCalledTimes(1);
    });

    it('Deve chamar método get em buscar agendamento', () => {
      service.buscarAgendamento(1, 1, '');
      expect(mock.doGet).toHaveBeenCalled();
    });

    it('Deve chamar metodo post em adicionar avaliacao', () => {
      service.adicionarAvaliacao(1, {atencao: 1, qualidadeProdutos:1, custoBeneficio:1, infraestrutura:1, qualidadeServico:1}, '');
      expect(mock.doPost).toHaveBeenCalled();
    });

    it('Deve chamar metodo get em buscarAvaliacaoPorAgendamento', () => {
      service.buscarAvaliacaoPorAgendamento(1, '');
      expect(mock.doGet).toHaveBeenCalled();
    });

    it('Deve chamar metodo get em buscaHorariosIndisponiveis', () => {
      service.buscaHorariosIndisponiveis(1, new Date(), '');
      expect(mock.doGet).toHaveBeenCalled();
    });

    it('Deve chamar metodo delete em deletarAgendamento', () => {
      service.deletarAgendamento(1, 1, '');
      expect(mock.doDelete).toHaveBeenCalled();
    });

    it('Deve chamar metodo patch em ativarAgendamento', () => {
      service.ativarAgendamento(1, 1, '');
      expect(mock.doPatch).toHaveBeenCalled();
    });

    it('Deve chamar metodo patch em confirmarNegociacao', () => {
      service.confirmarNegociacao(1, 1, {}, '');
      expect(mock.doPatch).toHaveBeenCalled();
    })




  });
});
