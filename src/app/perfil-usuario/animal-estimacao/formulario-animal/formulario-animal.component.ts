import { Component, OnInit, Input, Output, EventEmitter } from '@angular/core';
import { AnimalEstimacao } from 'src/app/interfaces/AnimalEstimacao';
import { TipoAnimal } from 'src/app/enum/TipoAnimal';

@Component({
  selector: 'app-formulario-animal',
  templateUrl: './formulario-animal.component.html',
  styleUrls: ['./formulario-animal.component.scss']
})
export class FormularioAnimalComponent implements OnInit {
  @Input() animal: AnimalEstimacao;
  @Output("adiciona-animal") adicionaAnimal = new EventEmitter<AnimalEstimacao>();
  @Output("atualiza-animal") atualizaAnimalInput = new EventEmitter<AnimalEstimacao>();
  @Input() exibeFormulario:Boolean;

  public tipoAnimal = TipoAnimal;
  constructor() { }

  getTipoAnimalKeys() {
    return Object.keys(this.tipoAnimal).filter(x => !(parseInt(x) >= 0));
  }

  getSelectionValue() {
    return this.animal.tipoAnimal;
  }

  ngOnInit(): void {
  }

  insereAnimal() {
    this.adicionaAnimal.emit(this.animal);
  }

  atualizaAnimal() {
    this.atualizaAnimalInput.emit(this.animal);
    this.animal = null;
  }

  limpa() {
    this.animal = {
      nome: "",
      tipoAnimal: TipoAnimal.CACHORRO
    };
  }
}
