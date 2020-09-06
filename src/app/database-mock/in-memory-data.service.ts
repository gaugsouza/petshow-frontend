import { Injectable } from '@angular/core';
import { InMemoryDbService } from 'angular-in-memory-web-api';
import { usuariosMock } from '../mocks/usuarioMock';
@Injectable({
  providedIn: 'root'
})
export class InMemoryDataService implements InMemoryDbService {
  createDb() {
    const contas = usuariosMock;
    return {
      contas
    }

  }

  genId(elementos: any[]) : number {
    return elementos.length > 0 ? Math.max(...elementos.map(el => el.id)) + 1 : 1;
  }
  constructor() { }
}
