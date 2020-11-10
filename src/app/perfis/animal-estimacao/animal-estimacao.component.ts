import { Component, OnInit, Input, Output, EventEmitter } from '@angular/core';
import { AnimalEstimacao } from 'src/app/interfaces/animalEstimacao';

@Component({
  selector: 'app-animal-estimacao',
  templateUrl: './animal-estimacao.component.html',
  styleUrls: ['./animal-estimacao.component.scss']
})
export class AnimalEstimacaoComponent implements OnInit {
  @Input('animais-estimacao') animaisEstimacao?: AnimalEstimacao[];
  @Output('remover-animal') removerAnimal = new EventEmitter<AnimalEstimacao>();
  @Output('seleciona-animal') animalEmitter = new EventEmitter<AnimalEstimacao>();

  constructor() { }

  ngOnInit(): void {
  }

  selecionaAnimal(animalEstimacao:AnimalEstimacao) {
    this.animalEmitter.emit(animalEstimacao);
  }

  removeAnimal(animalEstimacao:AnimalEstimacao) {
    this.removerAnimal.emit(animalEstimacao);
  }
}
