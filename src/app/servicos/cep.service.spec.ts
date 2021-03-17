import { HttpClientTestingModule } from '@angular/common/http/testing';
import { TestBed } from '@angular/core/testing';
import { LoggerTestingModule } from 'ngx-logger/testing';
import { JwtHelper } from '../util/jwt-helper';

import { CepService } from './cep.service';
import { HttpHandlerService } from './http-handler.service';

describe('CepService', () => {
  let service: CepService;

  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [
        HttpClientTestingModule,
        LoggerTestingModule,
      ],
      providers: [
        JwtHelper
      ]
    });
    service = TestBed.inject(CepService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });

  describe('Testes unitarios', () => {
    let mock:HttpHandlerService;
    beforeEach(() => {
      mock = new HttpHandlerService(null, null, null);

      mock.doGet = jest.fn((url, token?) => null);

      service = new CepService(mock);
    });

    it('Deve usar metodo get em buscaCep', () => {
      service.buscaCep('');
      expect(mock.doGet).toHaveBeenCalled();
    })
  });
});
