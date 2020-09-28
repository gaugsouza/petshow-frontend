import { TestBed, getTestBed } from '@angular/core/testing';

import { LoginService } from './login.service';
import {usuariosMock} from '../mocks/usuarioMock';
import { Usuario } from '../interfaces/usuario';
import { HttpClientTestingModule, HttpTestingController } from '@angular/common/http/testing';
import { LoggerTestingModule } from 'ngx-logger/testing';
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
      providers: [LoginService]
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
    let clienteLogado = service.realizaLogin("monica@gmail.com", "teste1234");
    expect(clienteLogado).toBeTruthy();
    const req = httpMock.match(`${service.LOGIN_SERVICE_URL}`);
    req.forEach(r => {
      expect(r.request.method).toBe('POST');
      r.flush(usuarioExemplo);
    });
  });

  it('Deve colocar um elemento no localStorage', () => {
    service.realizaLogin(usuarioExemplo.login.email, usuarioExemplo.login.senha);
    service.buscaTokenUsuario()
    .subscribe(token => {
      expect(token).toEqual(usuarioExemplo.id);
    })

    const req = httpMock.match(`${service.LOGIN_SERVICE_URL}`);
    req.forEach(r => {
      expect(r.request.method).toBe('POST');
      r.flush(usuarioExemplo);
    });
  });

  it('Deve não colocar nada no localStorage', () => {
    service.realizaLogin('aaaaa', 'bbbbbb');
    service.buscaTokenUsuario()
    .subscribe(token => {
      expect(token).toBeFalsy();
    })
    const req = httpMock.match(`${service.LOGIN_SERVICE_URL}`);
    req.forEach(r => {
      expect(r.request.method).toBe('POST');
      r.flush(null);
    });
  })
});
