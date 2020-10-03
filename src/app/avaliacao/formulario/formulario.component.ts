import { Component, OnInit, Output, EventEmitter } from '@angular/core';
import { Avaliacao } from 'src/app/interfaces/avaliacao';

@Component({
  selector: 'app-formulario',
  templateUrl: './formulario.component.html',
  styleUrls: ['./formulario.component.scss']
})
export class FormularioComponent implements OnInit {
  @Output('adiciona-avaliacao') adicionaAvaliacao = new EventEmitter<Avaliacao>();

  avaliacao:Avaliacao = {
    atencao:0,
    qualidadeProdutos:0,
    custoBeneficio:0,
    infraestrutura:0,
    qualidadeServico:0,
    comentario: null
  }
  private NOTA_MAXIMA = 5;

  constructor() { }

  ngOnInit(): void {
  }

  atualizaNota(campo:string, valor:number) {
    this.avaliacao[campo] = valor;
  }

  adicionarAvaliacao() {
    this.adicionaAvaliacao.emit(this.avaliacao);
  }

  getEstrelas(campo:string) {
    let nota = this.avaliacao[campo];
    let estrelasEmBranco = this.NOTA_MAXIMA - nota
    let estrelas:any[string] = [
      [...Array(nota).keys()].map(el => 'star'),
      [...Array(estrelasEmBranco).keys()].map(el => 'star_border')
    ];
    return estrelas.flatMap(el => el);
  }

}
