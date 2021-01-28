import { getTestBed, TestBed } from '@angular/core/testing';

import { ServicosService } from './servicos.service';
import { HttpClientTestingModule, HttpTestingController } from '@angular/common/http/testing';
import { LoggerTestingModule } from 'ngx-logger/testing';
import { JwtHelper } from '../util/jwt-helper';

describe('ServicosService', () => {
  let injector: TestBed;
  let service: ServicosService;
  let httpMock: HttpTestingController;

  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [
        HttpClientTestingModule,
        LoggerTestingModule
      ],
      providers: [
        JwtHelper
      ]});
      injector = getTestBed();
      service = injector.get(ServicosService);
      httpMock = injector.get(HttpTestingController);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });

  it('Deve trazer filtro vazio', () => {
    expect(service.geraFiltroString(null)).toBe('');
  });

  it('Deve retornar filtro com preco minimo', () => {
    const filtro = service.geraFiltroString({precoMin: 200});
    expect(filtro).toBe('&precoMin=200');
  });

  it('Deve retornar filtro com dois elementos', () => {
    const filtro = service.geraFiltroString({precoMin: 200, notaMedia: 3});
    expect(filtro).toBe('&precoMin=200&notaMedia=3');
  })
});
