import { TestBed, getTestBed } from '@angular/core/testing';

import { UsuarioService } from './usuario.service';
import { HttpClientTestingModule, HttpTestingController } from '@angular/common/http/testing';
import { LoggerTestingModule } from 'ngx-logger/testing';
import { LocalStorageService } from './local-storage.service';
import { Cliente } from '../interfaces/cliente';
import { TipoPessoa } from '../enum/tipo-pessoa.enum';
import { JwtHelper } from '../util/jwt-helper';
import { CLIENTE_SERVICE_URL as USUARIO_SERVICE_URL } from '../util/url';

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
        LocalStorageService,
        JwtHelper
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

    service.atualizaUsuario(usuarioMock, "")
    .subscribe(usuario => {
      expect(usuario).toBeTruthy();
      expect(usuario.nome).toEqual('Testinho');
      expect(usuario.id).toEqual(1);
    });

    const requests = httpMock.match(`${USUARIO_SERVICE_URL}`);
    requests.forEach(req => {
      expect(req.request.method).toBe('PUT');
      req.flush(usuarioMock);
    });
  });
});
