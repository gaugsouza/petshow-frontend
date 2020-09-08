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
  let store = {};

  beforeEach(() => {
    let spy = jest.spyOn(Storage.prototype, 'setItem');
    spy.mockImplementation((key, value) => store[key] = value);
    let spy2 = jest.spyOn(Storage.prototype, 'getItem');
    spy2.mockImplementation(key => store[key]);
    let spy3 = jest.spyOn(Storage.prototype, 'clear');
    spy3.mockImplementation(() => store = {});
    // window.localStorage.__proto__.getItem = jest.fn(key => store[key]);
    // window.localStorage.__proto__.setItem = jest.fn((key, value) => store[key] = value.toString());
    // window.localStorage.__proto__.clear = jest.fn(() => store = {});

  });


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
    expect(JSON.parse(localStorage.getItem('usuario'))).toEqual(usuarioExemplo);

    const req = httpMock.match(`${service.LOGIN_SERVICE_URL}`);
    req.forEach(r => {
      expect(r.request.method).toBe('POST');
      r.flush(usuarioExemplo);
    });
  });

  it('Deve não colocar nada no localStorage', () => {
    service.realizaLogin('aaaaa', 'bbbbbb');
    expect(JSON.parse(localStorage.getItem('usuario'))).toBeFalsy();

    const req = httpMock.match(`${service.LOGIN_SERVICE_URL}`);
    req.forEach(r => {
      expect(r.request.method).toBe('POST');
      r.flush(null);
    });
  })
});
