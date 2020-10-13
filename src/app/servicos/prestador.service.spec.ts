import { TestBed } from '@angular/core/testing';

import { PrestadorService } from './prestador.service';

import { HttpClientTestingModule, HttpTestingController } from '@angular/common/http/testing';
import { LoggerTestingModule } from 'ngx-logger/testing';
import { JwtHelper } from '../util/jwt-helper';

describe('PrestadorService', () => {
  let service: PrestadorService;

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
    service = TestBed.inject(PrestadorService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
