import { Injectable } from '@angular/core';
import { usuariosMock } from '../mocks/usuarioMock';
import { Observable, of } from 'rxjs';
import { Usuario } from '../interfaces/usuario';

@Injectable({
  providedIn: 'root'
})
export class ContaService {
  usuarios = [...usuariosMock];
  constructor() { }

  buscarPorId = (id:number):Observable<Usuario> => {
    let usuario = this.usuarios.find(usuario => usuario.id === id);
    return of(usuario);
  }
}
