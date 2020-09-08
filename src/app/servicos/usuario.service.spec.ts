import { TestBed } from '@angular/core/testing';

import { UsuarioService } from './usuario.service';
import { HttpClientTestingModule } from '@angular/common/http/testing';
import { LoggerTestingModule } from 'ngx-logger/testing';
import { LocalStorageService } from './local-storage.service';

describe('UsuarioService', () => {
  let service: UsuarioService;
  let storageService: LocalStorageService;
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
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });

  it('Deve retornar o usuario em localStorage', () => {
    let usuarioMock = {a: 'aaaa', b: 'bbbb'};
    storageService.setItem('usuario', usuarioMock);

    service.buscaUsuarioStorage()
    .subscribe(usuario => {
      expect(usuario).toEqual(usuarioMock);
    });
  });

  it('Deve retornar um usuario nulo', () => {
    service.buscaUsuarioStorage()
    .subscribe(usuario => {
      expect(usuario).toBeFalsy()
    })
  })
});
