import { Component, OnInit, Input } from '@angular/core';
import { AnimalEstimacao } from 'src/app/interfaces/AnimalEstimacao';

@Component({
  selector: 'app-animal-estimacao',
  templateUrl: './animal-estimacao.component.html',
  styleUrls: ['./animal-estimacao.component.scss']
})
export class AnimalEstimacaoComponent implements OnInit {
  @Input('animais-estimacao') animaisEstimacao?: AnimalEstimacao[];

  constructor() { }

  ngOnInit(): void {
    console.log(this.animaisEstimacao);
  }

}
