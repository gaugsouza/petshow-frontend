import {usuariosMock} from './usuarioMock';
import { Usuario } from '../interfaces/usuario';
import { Observable, of } from 'rxjs';
import { Login } from '../interfaces/login';
import { AnimalEstimacao } from '../interfaces/AnimalEstimacao';
import { Cliente } from '../interfaces/cliente';

export class UsuarioServiceMock {
  usuarios = [...usuariosMock];

  getUsuario = (id:number): Observable<Usuario> => {
    let usuario = this.usuarios.find(el => el.id === id);
    return of(usuario);
  }

  atualizaUsuario = (usuario:Usuario) : Observable<Usuario> => {
    let usuarioAAtualizar = this.usuarios.find(el => el.id === usuario.id);
    usuarioAAtualizar = {...usuario};
    this.usuarios = this.usuarios.map(el => el.id === usuarioAAtualizar.id ? usuarioAAtualizar : el);
    return of(usuarioAAtualizar);
  } 

  buscaPorLogin = (login: Login) : Observable<any> => {
    let usuario = this.usuarios.find(el => el.login === login);
    return of(usuario);
  }

  adicionarAnimalEstimacao = (animalEstimacao:AnimalEstimacao) : Observable<any> => {
    let usuario = animalEstimacao.dono;
    let usuarioLista = (this.usuarios.find(el => el.id === usuario.id) as Cliente);
    usuarioLista.animaisEstimacao.push(animalEstimacao);
    return this.atualizaUsuario(usuarioLista);
  }
    
}
