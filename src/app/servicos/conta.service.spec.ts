import { TestBed } from '@angular/core/testing';

import { ContaService } from './conta.service';
import { JwtHelper } from '../util/jwt-helper';
import { HttpHandlerService } from './http-handler.service'
import { HttpClientTestingModule } from '@angular/common/http/testing';
import { LoggerTestingModule } from 'ngx-logger/testing';

describe('ContaService', () => {
  let service: ContaService;

  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [
        JwtHelper,
        HttpHandlerService
      ],
      imports: [
        HttpClientTestingModule,
        LoggerTestingModule
      ]
    });
    service = TestBed.inject(ContaService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
