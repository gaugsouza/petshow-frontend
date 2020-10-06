import { Component, OnInit, Input, Output, EventEmitter } from '@angular/core';
import { AnimalEstimacao } from 'src/app/interfaces/AnimalEstimacao';
import { TipoAnimal } from 'src/app/enum/TipoAnimal';
import {MyErrorStateMatcher} from '../../../classes/my-error-state-matcher';
import { FormControl, Validators } from '@angular/forms';

@Component({
  selector: 'app-formulario-animal',
  templateUrl: './formulario-animal.component.html',
  styleUrls: ['./formulario-animal.component.scss']
})
export class FormularioAnimalComponent implements OnInit {
  @Input() animal: AnimalEstimacao = {
    nome: "",
    tipo: TipoAnimal.GATO
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

  public tipoAnimal = TipoAnimal;
  constructor() { }

  hasErrors() {
    return this.nomeFormControl.hasError('required') || this.nomeFormControl.hasError('minLength');
  }
  getTipoAnimalKeys() {
    return Object.keys(this.tipoAnimal).filter(x => !(parseInt(x) >= 0));
  }

  getSelectionValue() {
    return this.animal.tipo;
  }

  ngOnInit(): void {
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
      tipo: TipoAnimal.CACHORRO
    };
  }
}
