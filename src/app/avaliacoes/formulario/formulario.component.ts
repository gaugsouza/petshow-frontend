import {
  Component, OnInit, Output, EventEmitter, Input,
} from '@angular/core';
import { Avaliacao } from 'src/app/interfaces/avaliacao';
import { AvaliacaoService } from 'src/app/servicos/avaliacao.service';

@Component({
  selector: 'app-formulario',
  templateUrl: './formulario.component.html',
  styleUrls: ['./formulario.component.scss'],
})
export class FormularioComponent implements OnInit {
  @Input('avaliacao') avaliacao:Avaliacao = {
    comentario: '',
    atencao: 0,
    custoBeneficio: 0,
    infraestrutura: 0,
    qualidadeProdutos: 0,
    qualidadeServico: 0,
  };

  @Output('adiciona-avaliacao') adicionaAvaliacao = new EventEmitter<Avaliacao>();

  @Output('fecha-formulario') fechaFormulario = new EventEmitter<any>();

  public isEnabled:boolean = true;

  private NOTA_MAXIMA = 5;

  constructor(private avaliacaoService:AvaliacaoService) { }

  ngOnInit = (): void => {
  }

  atualizaNota(campo:string, valor:number) {
    this.avaliacao[campo] = valor;
  }

  adicionarAvaliacao() {
    this.isEnabled = !this.isEnabled;
    this.adicionaAvaliacao.emit(this.avaliacao);
  }

  fecharFormulario() {
    this.fechaFormulario.emit();
  }

  getEstrelas(campo:string): any[] {
    // if (!this.avaliacao) {
    //   return [];
    // }
    // const nota = this.avaliacao[campo];
    // const estrelasEmBranco = this.NOTA_MAXIMA - nota;
    // const estrelas:any[string] = [
    //   [...Array(nota).keys()].map(() => 'star'),
    //   [...Array(estrelasEmBranco).keys()].map(() => 'star_border'),
    // ];
    // return estrelas.flatMap((el:any) => el);

    return this.avaliacaoService.getEstrelasAvaliacao(this.avaliacao, campo);
  }
}
