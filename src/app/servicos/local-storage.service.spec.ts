import { TestBed } from '@angular/core/testing';

import { LocalStorageService } from './local-storage.service';

describe('LocalStorageService', () => {
  let service: LocalStorageService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(LocalStorageService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });

  it('should set an item', () => {
    let usuarioMock = {a: 'aaaa', b: 'bbbb'};
    service.setItem('usuario', usuarioMock);
    service.getItem('usuario')
    .subscribe(usuario => {
      expect(usuario).toEqual(usuarioMock);
    });
  });

  it('should remove an item', () => {
    let usuarioMock = {a: 'aaaa', b: 'bbbb'};
    service.setItem('usuario', usuarioMock);
    service.getLength()
    .subscribe(length => {
      expect(length).toBe(1);
    })
    service.removeItem('usuario');
    service.getLength()
    .subscribe(length => {
      expect(length).toBe(1);
    })
  });

  it('should remove all items', () => {
    let usuarioMock1 = {a: 'aaa', b: 'bbb'};
    let usuarioMock2 = {c: 'ccc', d: 'ddd'};
    service.setItem('usuario', usuarioMock1);
    service.setItem('usuario2', usuarioMock2);

    service.clear();

    service.getLength()
    .subscribe(length => {
      expect(length).toBe(0);
    })

  });

  it('should remove one item', () => {
    let usuarioMock1 = {a: 'aaa', b: 'bbb'};
    let usuarioMock2 = {c: 'ccc', d: 'ddd'};
    service.setItem('usuario', usuarioMock1);
    service.setItem('usuario2', usuarioMock2);

    service.removeItem('usuario');

    service.getLength().subscribe(length => {
      expect(length).toBe(1);
    });

    service.getItem('usuario2')
    .subscribe(usuario => {
      expect(usuario).toBeTruthy();
    });

    service.getItem('usuario')
    .subscribe(usuario => {
      expect(usuario).toBeFalsy();
    });
  });

  it('should replace item', () => {
    let usuarioMock1 = {a: 'aaa', b: 'bbb'};
    let usuarioMock2 = {c: 'ccc', d: 'ddd'};
    service.setItem('usuario', usuarioMock1);
    service.setItem('usuario', usuarioMock2);

    service.getItem('usuario').subscribe(usuario => {
      expect(usuario).toEqual(usuarioMock2);
    })
  });

});
