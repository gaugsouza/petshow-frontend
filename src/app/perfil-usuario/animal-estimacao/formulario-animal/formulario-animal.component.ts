import { Component, OnInit, Input, Output, EventEmitter } from '@angular/core';
import { AnimalEstimacao } from 'src/app/interfaces/AnimalEstimacao';
import { TipoAnimal } from 'src/app/enum/TipoAnimal';
import {MyErrorStateMatcher} from '../../../classes/my-error-state-matcher';
import { FormControl, Validators } from '@angular/forms';
import { UsuarioService } from 'src/app/servicos/usuario.service';

@Component({
  selector: 'app-formulario-animal',
  templateUrl: './formulario-animal.component.html',
  styleUrls: ['./formulario-animal.component.scss']
})
export class FormularioAnimalComponent implements OnInit {
  @Input() animal: AnimalEstimacao = {
    nome: "",
    tipo: {nome: 'GATO'}
  };
  @Output("adiciona-animal") adicionaAnimal = new EventEmitter<AnimalEstimacao>();
  @Output("atualiza-animal") atualizaAnimalInput = new EventEmitter<AnimalEstimacao>();
  @Output("cancelar-operacao") cancelaOperacao = new EventEmitter<any>();
  @Input() exibeFormulario:Boolean;

  matcher = new MyErrorStateMatcher();
  nomeFormControl = new FormControl('', [
    Validators.required,
    Validators.minLength(3)
  ]);

  public tiposAnimal:TipoAnimal[];

  constructor(private usuarioService:UsuarioService) { }

  ngOnInit(): void {
    this.usuarioService.buscarTiposAnimalEstimacao()
    .subscribe(tipos => this.tiposAnimal = tipos);
  }
  
  hasErrors() {
    return this.nomeFormControl.hasError('required') || this.nomeFormControl.hasError('minLength');
  }

  getSelectionValue() {
    return this.animal.tipo;
  }

  insereAnimal() {
    this.adicionaAnimal.emit(this.animal);
  }

  atualizaAnimal() {
    this.atualizaAnimalInput.emit(this.animal);
  }

  cancelarOperacao() {
    this.cancelaOperacao.emit();
  }

  
  limpa() {
    this.animal = {
      nome: "",
      tipo: {nome: 'GATO'}
    };
  }
}
