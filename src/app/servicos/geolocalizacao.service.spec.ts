import { HttpClientModule } from '@angular/common/http';
import { TestBed } from '@angular/core/testing';
import { LoggerTestingModule } from 'ngx-logger/testing';
import { JwtHelper } from '../util/jwt-helper';
import { Geolocalizacao } from '../interfaces/geolocalizacao';
import { GeolocalizacaoService } from './geolocalizacao.service';

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
});
