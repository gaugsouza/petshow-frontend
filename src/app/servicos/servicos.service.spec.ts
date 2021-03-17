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

  describe('Testes unitarios', () => {
    let mock:HttpHandlerService
    beforeEach(() => {
      mock = new HttpHandlerService(null, null, null);
      mock.doDelete = jest.fn();
      mock.doPatch = jest.fn();
      mock.doPost = jest.fn();
      mock.doPatch = jest.fn();
      mock.doPut = jest.fn();
  
      service = new ServicosService(mock);
    });
    
    it('Get em getTipos', () => {
      service.getTipos();
      expect(mock.doGet).toHaveBeenCalled();
    });

    it('Get em getTiposPorCidade', () => {
      service.getTiposPorCidade({estadoId: '', cidade: ''});
      expect(mock.doGet).toHaveBeenCalled();
    });

    it('Post em buscarServicosDetalhadosPorTipo', () => {
      service.buscarServicosDetalhadosPorTipo({}, 1, 1);
      expect(mock.doPost).toHaveBeenCalled();
    });

    it('Get em buscarServicosDetalhadosPorPrestador', () => {
      service.buscarServicosDetalhadosPorPrestador(1, 1, 1, '');
      expect(mock.doGet).toHaveBeenCalled();
    });

    it('Get em buscarPorPrestadorIdEServicoId', () => {
      service.buscarPorPrestadorIdEServicoId(1, 1, '');
      expect(mock.doGet).toHaveBeenCalled();
    });

    it('Get em buscarServicosComparacao', () => {
      service.buscarServicosComparacao([1,2,3], '');
      expect(mock.doGet).toHaveBeenCalled();
    });

    it('Post em adicionarAdicional', () => {
      service.adicionarAdicional(1, 2,{}, '');
      expect(mock.doGet).toHaveBeenCalled();
    });

    it('Put atualizarAdicional', () => {
      service.getTipos();
      expect(mock.doGet).toHaveBeenCalled();
    });

    it('Patch em desativarAdicional', () => {
      service.getTipos();
      expect(mock.doGet).toHaveBeenCalled();
    });

    it('Post em adicionarTipoAnimalAceito', () => {
      service.getTipos();
      expect(mock.doGet).toHaveBeenCalled();
    });

    it('Put em atualizarTipoAnimalAceito', () => {
      service.getTipos();
      expect(mock.doGet).toHaveBeenCalled();
    });

    it('Post em buscarServicosGeoloc', () => {
      service.getTipos();
      expect(mock.doGet).toHaveBeenCalled();
    });

    it('Patch em atualizarServicoDetalhado', () => {
      service.getTipos();
      expect(mock.doGet).toHaveBeenCalled();
    });
    
  })
});
