import {usuariosMock} from './usuarioMock';
import { Usuario } from '../interfaces/usuario';
import { Observable, of } from 'rxjs';
import { Login } from '../interfaces/login';
import { AnimalEstimacao } from '../interfaces/animalEstimacao';
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

  adicionarAnimalEstimacao = (animalEstimacao:AnimalEstimacao) : Observable<any> => {
    let usuario = animalEstimacao.dono;
    let usuarioLista = (this.usuarios.find(el => el.id === usuario.id) as Cliente);
    usuarioLista.animaisEstimacao.push(animalEstimacao);
    return this.atualizaUsuario(usuarioLista);
  }

  atualizarAnimalEstimacao = (id:number, animalEstimacao:AnimalEstimacao) : Observable<any> => {
    let usuario = animalEstimacao.dono as Cliente;
    usuario.animaisEstimacao.forEach(animal => {
      if(animal.id === id){
        animal.nome = animalEstimacao.nome;
      }
    });

    return this.atualizaUsuario(usuario);
  }

  removerAnimalEstimacao = (id:number) : Observable<any> => {    
    return this.atualizaUsuario(this.usuarios[0])
  }
    
}
