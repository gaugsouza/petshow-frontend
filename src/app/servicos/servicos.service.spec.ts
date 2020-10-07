import { TestBed } from '@angular/core/testing';

import { ServicosService } from './servicos.service';
import { HttpClientTestingModule, HttpTestingController } from '@angular/common/http/testing';
import { LoggerTestingModule } from 'ngx-logger/testing';

describe('ServicosService', () => {
  let service: ServicosService;

  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [
        HttpClientTestingModule,
        LoggerTestingModule
      ]
    });
    service = TestBed.inject(ServicosService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
