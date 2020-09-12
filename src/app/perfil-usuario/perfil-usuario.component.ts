import { Component, OnInit } from '@angular/core';
import { UsuarioService } from '../servicos/usuario.service';
import { Cliente } from '../interfaces/cliente';
import { AnimalEstimacao } from '../interfaces/AnimalEstimacao';
import { TipoAnimal } from '../enum/TipoAnimal';
import { ActivatedRoute, Router } from '@angular/router';

@Component({
  selector: 'app-perfil-usuario',
  templateUrl: './perfil-usuario.component.html',
  styleUrls: ['./perfil-usuario.component.scss']
})
export class PerfilUsuarioComponent implements OnInit {
  animal:AnimalEstimacao = {
    nome: "",
    tipoAnimal: TipoAnimal.CACHORRO
  };
  usuario:Cliente;
  isFormVisivel:Boolean = false;

  constructor(private usuarioService:UsuarioService,
              private router:Router) { }

  ngOnInit(): void {
    this.getUsuario();
    this.limpaAnimal();
  }

  selecionaAnimal(animalEstimacao:AnimalEstimacao): void {
    this.animal = animalEstimacao;
    this.exibeFormulario();
  }

  getUsuario() : void {
    this.usuarioService.buscaUsuarioStorage()
    .subscribe((usuario:Cliente) => {
      if(!usuario) {
        this.router.navigate(['/login']);
        return;
      }
      this.usuario = usuario
    });
  }

  adicionaAnimal(animalEstimacao:AnimalEstimacao) : void {
    let animaisEstimacao = this.usuario.animaisEstimacao;
    this.usuario.animaisEstimacao = [...animaisEstimacao, animalEstimacao];
    this.usuarioService.atualizaUsuario(this.usuario)
    .subscribe();
    this.ocultaFormulario();
    this.limpaAnimal();
  }

  removeAnimal(animalEstimacao : AnimalEstimacao | number):void {
    let id:number = typeof animalEstimacao === 'number' ? animalEstimacao : animalEstimacao.id;
    let animaisAManter = this.usuario.animaisEstimacao.filter(animal => animal.id !== id);
    this.usuario.animaisEstimacao = animaisAManter;
    this.usuarioService.atualizaUsuario(this.usuario)
    .subscribe();
  }

  exibeFormulario() {
    this.isFormVisivel = true;
  }
  ocultaFormulario() {
    this.isFormVisivel = false;
  }

  editaAnimal(animalEstimacao: AnimalEstimacao) : void {
    let animais = this.usuario.animaisEstimacao;
    let animaisAtualizados = animais.map(el => el.id === animalEstimacao.id ? animalEstimacao : el);
    this.usuario.animaisEstimacao = animaisAtualizados;
    this.usuarioService.atualizaUsuario(this.usuario)
    .subscribe();
    this.ocultaFormulario();
    this.limpaAnimal();
  }

  limpaAnimal() {
    this.animal = {
      nome: "",
      tipoAnimal: TipoAnimal.CACHORRO
    }
  }
}
