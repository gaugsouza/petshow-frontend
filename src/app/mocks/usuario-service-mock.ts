import {usuariosMock} from './usuarioMock';
import { Usuario } from '../interfaces/usuario';
import { Observable, of } from 'rxjs';
import { Login } from '../interfaces/login';
import { AnimalEstimacao } from '../interfaces/animalEstimacao';
import { Cliente } from '../interfaces/cliente';

export class UsuarioServiceMock {
  usuarios = [...usuariosMock];

  getUsuario = (id:number): Observable<Usuario> => {
    let usuario = this.usuarios[0];
    return of(usuario);
  }

  atualizaUsuario = (usuario:Usuario) : Observable<Usuario> => {
    let usuarioAAtualizar = this.usuarios.find(el => el.id === usuario.id);
    usuarioAAtualizar = {...usuario};
    this.usuarios = this.usuarios.map(el => el.id === usuarioAAtualizar.id ? usuarioAAtualizar : el);
    return of(usuarioAAtualizar);
  } 

  adicionarAnimalEstimacao = (animalEstimacao:AnimalEstimacao) : Observable<any> => {
    let usuarioLista = (this.usuarios.find(el => el.id === animalEstimacao.donoId) as Cliente);
    usuarioLista.animaisEstimacao.push(animalEstimacao);
    return this.atualizaUsuario(usuarioLista);
  }

  atualizarAnimalEstimacao = (id:number, animalEstimacao:AnimalEstimacao) : Observable<any> => {
    //let usuario = animalEstimacao.donoId as Cliente;
    let usuario = (this.usuarios[0] as Cliente);
    usuario.animaisEstimacao.forEach(animal => {
      if(animal.id === id){
        animal.nome = animalEstimacao.nome;
      }
    });

    return this.atualizaUsuario(usuario);
  }

  removerAnimalEstimacao = (id:number) : Observable<any> => {   
    let usuario = (this.usuarios[0] as Cliente);
    usuario.animaisEstimacao = usuario.animaisEstimacao.filter(el => el.id !== id);
    return this.atualizaUsuario(usuario)
  }

  buscarTiposAnimalEstimacao = (token:string) : Observable<any> => {
    return of([
      {id: 1, tipo: "CACHORRO"},
      {id: 2, tipo: "GATO"},
      {id: 3, tipo: "AVE"},
      {id:4, tipo: "REPTIL"}
    ]);
  } 
    
  buscarAnimaisEstimacaoPorDono(donoId:number, pagina:number, quantidadeItens:number, token:string) : Observable<any> {
    let animais = (this.usuarios[0] as Cliente).animaisEstimacao
    let objRetorno = {
      content: animais,
      totalElements: animais.length,
      size: animais.length,
      pageable: {
        pageNumber: 1
      }
    }
    return of(objRetorno);

  }
}
