import { getTestBed, TestBed } from '@angular/core/testing';

import { ServicosService } from './servicos.service';
import { ServicoDetalhado } from '../interfaces/servico-detalhado';
import { HttpClientTestingModule, HttpTestingController } from '@angular/common/http/testing';
import { LoggerTestingModule } from 'ngx-logger/testing';

describe('ServicosService', () => {
  let injector: TestBed;
  let service: ServicosService;
  let httpMock: HttpTestingController;

  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [
        HttpClientTestingModule,
        LoggerTestingModule
      ]});
      injector = getTestBed();
      service = injector.get(ServicosService);
      httpMock = injector.get(HttpTestingController);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });

  // it('Deve retornar objeto com lista de serviços detalhados', () => {
  //   let servicoBuscado:ServicoDetalhado;
  //   service.buscarServicosDetalhadosPorTipo(1).subscribe((el:ServicoDetalhado) => {
  //     expect(servicoBuscado).toBeTruthy();
  //   });
  // });
});
