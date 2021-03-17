import { getTestBed, TestBed } from '@angular/core/testing';

import { ServicosService } from './servicos.service';
import { HttpClientTestingModule, HttpTestingController } from '@angular/common/http/testing';
import { LoggerTestingModule } from 'ngx-logger/testing';
import { JwtHelper } from '../util/jwt-helper';
import { HttpHandlerService } from './http-handler.service';
describe('ServicosService', () => {
  let injector: TestBed;
  let service: ServicosService;
  let httpMock: HttpTestingController;

  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [
        HttpClientTestingModule,
        LoggerTestingModule
      ],
      providers: [
        JwtHelper
      ]});
      injector = getTestBed();
      service = injector.get(ServicosService);
      httpMock = injector.get(HttpTestingController);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
