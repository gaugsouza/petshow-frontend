import { TestBed, getTestBed } from '@angular/core/testing';

import { UsuarioService } from './usuario.service';
import { HttpClientTestingModule, HttpTestingController } from '@angular/common/http/testing';
import { LoggerTestingModule } from 'ngx-logger/testing';
import { LocalStorageService } from './local-storage.service';
import { usuariosMock } from '../mocks/usuarioMock';
import { Cliente } from '../interfaces/cliente';
import { TipoPessoa } from '../enum/tipo-pessoa.enum';
import { USER_TOKEN } from '../util/constantes';

describe('UsuarioService', () => {
  let service: UsuarioService;
  let storageService: LocalStorageService;
  let injector: TestBed;
  let httpMock: HttpTestingController;

  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [
        HttpClientTestingModule,
        LoggerTestingModule
      ],
      providers: [
        LocalStorageService
      ]
    });
    service = TestBed.inject(UsuarioService);
    storageService = TestBed.inject(LocalStorageService);
    injector = getTestBed();
    httpMock = injector.get(HttpTestingController);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });

  it('Deve atualizar um usuario', () => {
    let usuarioMock: Cliente = {
      id: 1,
      tipo: TipoPessoa.CLIENTE,
      nome: "Teste",
      cpf: "44444444444",
      telefone: "1112345678",
      login: {
        id: 1,
        email: "teste@teste",
        senha: "teste1234"
      }
    }

    const requests = httpMock.match(`${service.USUARIO_SERVICE_URL}`);
    requests.forEach(req => {
      expect(req.request.method).toBe('PUT');
      req.flush(usuarioMock);
    });
  });
});
