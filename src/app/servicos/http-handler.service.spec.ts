import { TestBed } from '@angular/core/testing';

import { HttpHandlerService } from './http-handler.service';
import { HttpClientTestingModule } from '@angular/common/http/testing';
import { LoggerTestingModule } from 'ngx-logger/testing';
import { JwtHelper } from '../util/jwt-helper';
describe('HttpHandlerService', () => {
  let service: HttpHandlerService;

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
    service = TestBed.inject(HttpHandlerService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
