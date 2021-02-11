import { HttpClientTestingModule } from '@angular/common/http/testing';
import { TestBed } from '@angular/core/testing';
import { LoggerTestingModule } from 'ngx-logger/testing';
import { JwtHelper } from '../util/jwt-helper';

import { AgendamentoService } from './agendamento.service';

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
});
