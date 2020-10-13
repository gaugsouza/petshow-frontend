import { Component, OnInit } from '@angular/core';
import { UsuarioService } from '../servicos/usuario.service';
import { Cliente } from '../interfaces/cliente';
import { AnimalEstimacao } from '../interfaces/animalEstimacao';
import { Router } from '@angular/router';
import { LocalStorageService } from '../servicos/local-storage.service';
import { USER_TOKEN } from '../util/constantes';
import { Endereco } from '../interfaces/endereco';

@Component({
  selector: 'app-perfil-usuario',
  templateUrl: './perfil-usuario.component.html',
  styleUrls: ['./perfil-usuario.component.scss']
})
export class PerfilUsuarioComponent implements OnInit {
  animal:AnimalEstimacao = {
    nome: "",
    tipo: {id: 2, nome: 'GATO'}
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
    this.localStorageService.getItem(USER_TOKEN).subscribe((token : string) => {
      this.usuarioService.getUsuario(token)
      .subscribe((usuario:Cliente) => {
        this.usuario = usuario;
      });
    });
  }

  adicionaAnimal({...animalEstimacao}:AnimalEstimacao) : void {
    animalEstimacao.donoId = this.usuario.id;
    this.localStorageService.getItem(USER_TOKEN).subscribe((token : string) => {
      this.usuarioService.adicionarAnimalEstimacao(animalEstimacao, token).subscribe(() => {
        this.limpaAnimal();
        this.getUsuario();
        this.isFormVisivel = false;
      });    
    })
  }

  removeAnimal(animalEstimacao : AnimalEstimacao):void {
    this.localStorageService.getItem(USER_TOKEN).subscribe((token : string) => {
      this.usuarioService.removerAnimalEstimacao(animalEstimacao.id, token).subscribe(() => {
        this.getUsuario();
      });
    });
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
    this.localStorageService.getItem(USER_TOKEN).subscribe((token : string) => {
      this.usuarioService.atualizaUsuario(this.usuarioRequest, token).subscribe(() => {
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

  editaAnimal(animalEstimacao : AnimalEstimacao) : void { 
    this.localStorageService.getItem(USER_TOKEN).subscribe((token : string) => {
      this.usuarioService.atualizarAnimalEstimacao(animalEstimacao.id, animalEstimacao, token).subscribe(res => {
        this.getUsuario();
        this.limpaAnimal();
        this.ocultaFormulario();
      })
    });
  }

  limpaAnimal() {
    this.animal = {
      nome: "",
      tipo: {id: 2, nome: 'GATO'}
    }
  }

  cancelar() {
    this.isFormVisivel = false;
    this.limpaAnimal();
  }

  atualizaEndereco(endereco:Endereco):void {
    this.usuarioRequest = {...this.usuario};
    this.usuarioRequest.endereco = endereco;
    this.atualizaUsuario();
  }

  alteraTelefone(telefone:string):void {
    this.usuarioRequest = {...this.usuario};
    this.usuarioRequest.telefone = telefone;
    this.atualizaUsuario();
  }
}
