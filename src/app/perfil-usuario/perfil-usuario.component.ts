import { Component, OnInit } from '@angular/core';
import { UsuarioService } from '../servicos/usuario.service';
import { Cliente } from '../interfaces/cliente';
import { AnimalEstimacao } from '../interfaces/AnimalEstimacao';
import { TipoAnimal } from '../enum/TipoAnimal';
import { Router } from '@angular/router';
import { LocalStorageService } from '../servicos/local-storage.service';

@Component({
  selector: 'app-perfil-usuario',
  templateUrl: './perfil-usuario.component.html',
  styleUrls: ['./perfil-usuario.component.scss']
})
export class PerfilUsuarioComponent implements OnInit {
  animal:AnimalEstimacao = {
    nome: "",
    tipo: TipoAnimal.CACHORRO
  };
  usuario:Cliente;
  usuarioRequest:Cliente;
  isFormVisivel:Boolean = false;
  erroRequisicao:String;
  mensagemSucesso:String;
  constructor(private usuarioService:UsuarioService,
              private router:Router,
              private localStorageService: LocalStorageService) { }

  ngOnInit(): void {
    this.getUsuario();
    this.limpaAnimal();
  }

  selecionaAnimal(animalEstimacao:AnimalEstimacao): void {
    this.animal = {...animalEstimacao};
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

  adicionaAnimal({...animalEstimacao}:AnimalEstimacao) : void {
    this.usuarioRequest = {...this.usuario};
    let animaisEstimacao = this.usuarioRequest.animaisEstimacao;
    this.usuarioRequest.animaisEstimacao = [...animaisEstimacao, animalEstimacao];
    this.atualizaUsuario();
  }

  removeAnimal(animalEstimacao : AnimalEstimacao | number):void {
    this.usuarioRequest = {...this.usuario};
    let id:number = typeof animalEstimacao === 'number' ? animalEstimacao : animalEstimacao.id;
    let animaisAManter = this.usuarioRequest.animaisEstimacao.filter(animal => animal.id !== id);
    this.usuarioRequest.animaisEstimacao = animaisAManter;
    this.atualizaUsuario();
  }

  exibeFormulario() {
    this.erroRequisicao = null;
    this.mensagemSucesso = null;
    this.isFormVisivel = true;
  }
  ocultaFormulario() {
    this.isFormVisivel = false;
  }

  atualizaUsuario() {
    this.usuarioService.atualizaUsuario(this.usuarioRequest).subscribe(res => {
      this.localStorageService.setItem('usuario', res).subscribe(() => {
        this.getUsuario();
        this.limpaAnimal();
        this.ocultaFormulario();
        this.usuarioRequest = null;
        this.mensagemSucesso = "Operação realizada com sucesso";
      });
    },
    ({error}) => {
      console.log(error);
      this.erroRequisicao = "Erro durante a operação";
    });
  }

  editaAnimal({...animalEstimacao}: AnimalEstimacao) : void {
    this.usuarioRequest = {...this.usuario};
    let animais = this.usuarioRequest.animaisEstimacao;
    this.usuarioRequest.animaisEstimacao = animais.map(el => el.id === animalEstimacao.id ? animalEstimacao : el);
    this.atualizaUsuario();
  }


  limpaAnimal() {
    this.animal = {
      nome: "",
      tipo: TipoAnimal.CACHORRO
    }
  }

  cancelar() {
    this.isFormVisivel = false;
    this.limpaAnimal();
  }
}
