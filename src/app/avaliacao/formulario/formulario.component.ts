import { Component, OnInit, Output, EventEmitter, Input } from '@angular/core';
import { Avaliacao } from 'src/app/interfaces/avaliacao';

@Component({
  selector: 'app-formulario',
  templateUrl: './formulario.component.html',
  styleUrls: ['./formulario.component.scss']
})
export class FormularioComponent implements OnInit {
  @Input('avaliacao') avaliacao:Avaliacao = {
    comentario: '',
    atencao: 0,
    custoBeneficio: 0,
    infraestrutura: 0,
    qualidadeProdutos: 0,
    qualidadeServico: 0
  };
  @Output('adiciona-avaliacao') adicionaAvaliacao = new EventEmitter<Avaliacao>();
  @Output('fecha-formulario') fechaFormulario = new EventEmitter<any>();


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

  fecharFormulario() {
    this.fechaFormulario.emit();
  }

  getEstrelas(campo:string) {
    if(!this.avaliacao){
      return;
    }
    let nota = this.avaliacao[campo];
    let estrelasEmBranco = this.NOTA_MAXIMA - nota
    let estrelas:any[string] = [
      [...Array(nota).keys()].map(el => 'star'),
      [...Array(estrelasEmBranco).keys()].map(el => 'star_border')
    ];
    return estrelas.flatMap(el => el);
  }

}
