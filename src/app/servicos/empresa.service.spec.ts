import { TestBed } from '@angular/core/testing';
import { HttpClientTestingModule } from '@angular/common/http/testing';
import { LoggerTestingModule } from 'ngx-logger/testing';
import { EmpresaService } from './empresa.service';
import { JwtHelper } from '../util/jwt-helper';
import { HttpHandlerService } from './http-handler.service';

describe('EmpresaService', () => {
  let service: EmpresaService;

  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [
        HttpClientTestingModule,
        LoggerTestingModule
      ],
      providers: [
        JwtHelper
      ]
    });
    service = TestBed.inject(EmpresaService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });

  describe('Testes unitarios', () => {
    const mock:HttpHandlerService = new HttpHandlerService(null, null, null);
    mock.doPut = jest.fn((url, body, token) => null);

    it('Deve chamar metodo put em atualizaEmpresa', () => {
      service = new EmpresaService(mock);
      service.atualizaEmpresa({}, '');

      expect(mock.doPut).toHaveBeenCalled();
    })
  });
});
