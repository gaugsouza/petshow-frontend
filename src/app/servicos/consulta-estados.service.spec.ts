import { TestBed } from '@angular/core/testing';

import { ConsultaEstadosService } from './consulta-estados.service';
import { HttpClientTestingModule } from '@angular/common/http/testing';
import { LoggerTestingModule } from 'ngx-logger/testing';
import { JwtHelper } from '../util/jwt-helper';
import { HttpHandlerService } from './http-handler.service';

describe('ConsultaEstadosService', () => {
  let service: ConsultaEstadosService;
  let handler; HttpHandlerService;
  beforeEach(() => {
    TestBed.configureTestingModule({
       imports: [
        HttpClientTestingModule,
        LoggerTestingModule
      ],
      providers: [
        JwtHelper,
        HttpHandlerService
      ]
    });
    service = TestBed.inject(ConsultaEstadosService);
    handler = TestBed.inject(HttpHandlerService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });

  it('Deve fazer a requisição', () => {
    let spy = jest.spyOn(handler, 'doGet');
    service.getEstados();
    expect(spy).toHaveBeenCalled();
  });

  it('Deve chamar handler em  requisição de cidades', () => {
    let spy = jest.spyOn(handler, 'doGet');
    service.getCidades('SP');
    expect(spy).toHaveBeenCalled();
  })
});
