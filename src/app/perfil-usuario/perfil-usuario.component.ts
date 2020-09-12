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
  isFormVisivel:Boolean = false;

  constructor(private usuarioService:UsuarioService,
              private router:Router,
              private localStorageService: LocalStorageService) { }

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
    this.ocultaFormulario();
    this.limpaAnimal();
    let animaisEstimacao = this.usuario.animaisEstimacao;
    this.usuario.animaisEstimacao = [...animaisEstimacao, animalEstimacao];
    this.atualizaUsuario();
    
  }

  removeAnimal(animalEstimacao : AnimalEstimacao | number):void {
    let id:number = typeof animalEstimacao === 'number' ? animalEstimacao : animalEstimacao.id;
    let animaisAManter = this.usuario.animaisEstimacao.filter(animal => animal.id !== id);
    this.usuario.animaisEstimacao = animaisAManter;
    this.atualizaUsuario();
  }

  exibeFormulario() {
    this.isFormVisivel = true;
  }
  ocultaFormulario() {
    this.isFormVisivel = false;
  }

  atualizaUsuario() {
    this.usuarioService.atualizaUsuario(this.usuario).subscribe(res => {
      console.log('atualizou');
      this.localStorageService.setItem('usuario', res).subscribe();
    });
  }

  editaAnimal({...animalEstimacao}: AnimalEstimacao) : void {
    this.limpaAnimal();
    this.ocultaFormulario();
    let animais = this.usuario.animaisEstimacao;
    this.usuario.animaisEstimacao = animais.map(el => el.id === animalEstimacao.id ? animalEstimacao : el);
    this.atualizaUsuario();
    // let animais = this.usuario.animaisEstimacao;
    // let animaisAtualizados = animais.map(el => el.id === animalEstimacao.id ? animalEstimacao : el);
    // this.usuario.animaisEstimacao = animaisAtualizados;
    // this.usuarioService.atualizaUsuario(this.usuario)
    // .subscribe();
    // this.ocultaFormulario();
    // this.limpaAnimal();
  }

  limpaAnimal() {
    this.animal = {
      nome: "",
      tipo: TipoAnimal.CACHORRO
    }
  }
}
