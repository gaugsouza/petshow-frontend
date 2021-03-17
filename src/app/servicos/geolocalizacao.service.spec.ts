import { HttpClientModule } from '@angular/common/http';
import { TestBed } from '@angular/core/testing';
import { LoggerTestingModule } from 'ngx-logger/testing';
import { JwtHelper } from '../util/jwt-helper';
import { Geolocalizacao } from '../interfaces/geolocalizacao';
import { GeolocalizacaoService } from './geolocalizacao.service';
import {HttpHandlerService} from './http-handler.service';
describe('GeolocalizacaoService', () => {
  let service: GeolocalizacaoService;

  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [
        HttpClientModule,
        LoggerTestingModule,
      ],
      providers: [
        JwtHelper
      ]
    });
    service = TestBed.inject(GeolocalizacaoService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });

  describe('Testes unitarios', () => {
    const mock:HttpHandlerService = new HttpHandlerService(null, null, null);
    mock.doGet = jest.fn((url, token) => null);
   
    it('Deve chamar metodo get em buscaGeoloc', () => {
      service = new GeolocalizacaoService(mock);
      service.buscaGeoloc('', '');
      expect(mock.doGet).toHaveBeenCalled();
    });

    it('Deve chamar metodo get em buscaGeolocCidade', () => {
      service = new GeolocalizacaoService(mock);
      service.buscaGeolocCidade('', '');
      expect(mock.doGet).toHaveBeenCalled();
    })
  })
});
