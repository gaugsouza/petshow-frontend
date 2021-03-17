import { TestBed, getTestBed } from '@angular/core/testing';

import { LoginService } from './login.service';
import {usuariosMock} from '../mocks/usuarioMock';
import { Usuario } from '../interfaces/usuario';
import { HttpClientTestingModule, HttpTestingController } from '@angular/common/http/testing';
import { LoggerTestingModule } from 'ngx-logger/testing';
import { JwtHelper } from '../util/jwt-helper';
import { ACESSO_SERVICE_URL } from '../util/url';
import { HttpHandlerService } from './http-handler.service';
import { LocalStorageService} from './local-storage.service';
import { of } from 'rxjs';

describe('LoginService', () => {
  let injector: TestBed;
  let service: LoginService;
  let httpMock: HttpTestingController;
  let usuarioExemplo: Usuario = usuariosMock[0];

  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [
        HttpClientTestingModule,
        LoggerTestingModule
      ],
      providers: [LoginService, JwtHelper]
    });
    injector = getTestBed();
    service = injector.get(LoginService);
    httpMock = injector.get(HttpTestingController);
  });
  
  afterEach(() => {
    httpMock.verify();
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });

  it('Deve retornar um cliente', () => {
    let clienteLogado = service.realizaLogin({email: "monica@gmail.com", senha:"teste1234"});
    expect(clienteLogado).toBeTruthy();
    const req = httpMock.match(`${ACESSO_SERVICE_URL}`);
    req.forEach(r => {
      expect(r.request.method).toBe('POST');
      r.flush(usuarioExemplo);
    });
  });

  it('Deve colocar um elemento no localStorage', () => {
    service.realizaLogin({email:usuarioExemplo.login.email, senha:usuarioExemplo.login.senha});

    const req = httpMock.match(`${ACESSO_SERVICE_URL}`);
    req.forEach(r => {
      expect(r.request.method).toBe('POST');
      r.flush(usuarioExemplo);
    });
  });

  describe('Testes unitarios', () => {
    const mock:HttpHandlerService = new HttpHandlerService(null, null, null);
    mock.doPost = jest.fn((url, body, token) => null);
    mock.doGet = jest.fn((url, token) => null);
    const storageMock = new LocalStorageService(null);
    storageMock.getItem = jest.fn((key) => of(''));

    it('Deve chamar metodo post em realizaLogin', () => {
      service = new LoginService(mock, storageMock);
      service.realizaLogin({email: '', senha: ''});
      expect(mock.doPost).toHaveBeenCalled();
    });

    it('Deve chamar metodo post em cadastrarEmpresa', () => {
      service = new LoginService(mock, storageMock);
      service.cadastrarEmpresa({});
      expect(mock.doPost).toHaveBeenCalled()
    });

    it('Deve chamar metodo post em cadastrarUsuario', () => {
      service = new LoginService(mock, storageMock);
      service.cadastrarUsuario({});
      expect(mock.doPost).toHaveBeenCalled()
    });

    it('Deve chamar metodo post em ativaConta', () => {
      service = new LoginService(mock, storageMock);
      service.ativaConta('');
      expect(mock.doGet).toHaveBeenCalled()
    });

    it('Deve chamar metodo post em reenviaAtivacao', () => {
      service = new LoginService(mock, storageMock);
      service.reenviaAtivacao('');
      expect(mock.doPost).toHaveBeenCalled()
    });

    it('Deve chamar metodo em localStorage', () => {
      service = new LoginService(mock, storageMock);
      service.buscaTokenUsuario();
      expect(storageMock.getItem).toHaveBeenCalled();
    })
  });
});
