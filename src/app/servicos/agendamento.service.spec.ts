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
});
