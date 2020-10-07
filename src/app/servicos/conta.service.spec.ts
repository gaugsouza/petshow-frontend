import { TestBed } from '@angular/core/testing';

import { ContaService } from './conta.service';
import { HttpClientTestingModule, HttpTestingController } from '@angular/common/http/testing';
import { LoggerTestingModule } from 'ngx-logger/testing';
describe('ContaService', () => {
  let service: ContaService;

  beforeEach(() => {
    TestBed.configureTestingModule({
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
