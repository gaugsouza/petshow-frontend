import { Component, OnInit } from '@angular/core';
import { UsuarioService } from '../servicos/usuario.service';
import { Cliente } from '../interfaces/cliente';
import { AnimalEstimacao } from '../interfaces/AnimalEstimacao';

@Component({
  selector: 'app-perfil-usuario',
  templateUrl: './perfil-usuario.component.html',
  styleUrls: ['./perfil-usuario.component.scss']
})
export class PerfilUsuarioComponent implements OnInit {
  usuario:Cliente;
  constructor(private usuarioService:UsuarioService) { }

  ngOnInit(): void {
    this.getUsuario();
  }

  getUsuario() : void {
    this.usuarioService.buscaUsuarioStorage()
    .subscribe((usuario:Cliente) => this.usuario = usuario);
  }

  adicionaAnimal(animalEstimacao:AnimalEstimacao) : void {
    let animaisEstimacao = this.usuario.animaisEstimacao;
    this.usuario.animaisEstimacao = [...animaisEstimacao, animalEstimacao];
    this.usuarioService.atualizaUsuario(this.usuario)
    .subscribe(usuario => {
      this.usuario = usuario
    });
  }

  removeAnimal(animalEstimacao : AnimalEstimacao | number):void {
    let id:number = typeof animalEstimacao === 'number' ? animalEstimacao : animalEstimacao.id;
    let animaisAManter = this.usuario.animaisEstimacao.filter(animal => animal.id !== id);
    this.usuario.animaisEstimacao = animaisAManter;
    this.usuarioService.atualizaUsuario(this.usuario)
    .subscribe(usuario => {
      this.usuario = usuario;
    });
  }

  editaAnimal(animalEstimacao: AnimalEstimacao) : void {
    let animais = this.usuario.animaisEstimacao;
    let animaisAtualizados = animais.map(el => el.id === animalEstimacao.id ? animalEstimacao : el);
    this.usuario.animaisEstimacao = animaisAtualizados;
    this.usuarioService.atualizaUsuario(this.usuario)
    .subscribe(usuario => {
      this.usuario = usuario;
    })
  }
}
