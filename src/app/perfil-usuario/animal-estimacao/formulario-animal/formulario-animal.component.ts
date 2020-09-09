import { Component, OnInit, Input } from '@angular/core';
import { AnimalEstimacao } from 'src/app/interfaces/AnimalEstimacao';
import { TipoAnimal } from 'src/app/enum/TipoAnimal';

@Component({
  selector: 'app-formulario-animal',
  templateUrl: './formulario-animal.component.html',
  styleUrls: ['./formulario-animal.component.scss']
})
export class FormularioAnimalComponent implements OnInit {
  @Input() animal?: AnimalEstimacao;
  @Input("adiciona-animal") adicionaAnimal;
  @Input("atualiza-animal") atualizaAnimalInput;

  public tipoAnimal = TipoAnimal;
  constructor() { }

  getTipoAnimalKeys() {
    return Object.keys(this.tipoAnimal).filter(x => !(parseInt(x) >= 0));
  }

  ngOnInit(): void {}

  insereAnimal() {
    this.adicionaAnimal(this.animal);
  }

  atualizaAnimal() {
    this.atualizaAnimalInput(this.animal);
  }
}
