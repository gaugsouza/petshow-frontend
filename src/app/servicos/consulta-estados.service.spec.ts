import { TestBed } from '@angular/core/testing';

import { ConsultaEstadosService } from './consulta-estados.service';
import { HttpClientTestingModule } from '@angular/common/http/testing';
import { LoggerTestingModule } from 'ngx-logger/testing';

describe('ConsultaEstadosService', () => {
  let service: ConsultaEstadosService;

  beforeEach(() => {
    TestBed.configureTestingModule({
       imports: [
        HttpClientTestingModule,
        LoggerTestingModule
      ]
    });
    service = TestBed.inject(ConsultaEstadosService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
