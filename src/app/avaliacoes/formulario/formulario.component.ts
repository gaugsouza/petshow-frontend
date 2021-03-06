import {
  Component, OnInit, Output, EventEmitter, Input,
} from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { Avaliacao } from 'src/app/interfaces/avaliacao';
import { ConfirmacaoCancelamentoComponent } from 'src/app/perfis/confirmacao-cancelamento/confirmacao-cancelamento.component';
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

  constructor(
    private confirmacao: MatDialog,
    private cancelamento: MatDialog,
    private avaliacaoService:AvaliacaoService,
  ) { }

  ngOnInit = (): void => {
  }

  atualizaNota(campo:string, valor:number) {
    this.avaliacao[campo] = valor;
  }

  adicionarAvaliacao() {
    this.adicionaAvaliacao.emit(this.avaliacao);
  }

  cancelarAvaliacao() {
    const cancelRef = this.cancelamento.open(ConfirmacaoCancelamentoComponent,
      {
        data: 'DESEJA_CONFIRMAR_CANCELAMENTO',
      });
    cancelRef.afterClosed().subscribe((result) => {
      if (result) {
        this.fechaFormulario.emit();
      }
    });
  }

  getEstrelas(campo:string): any[] {
    return this.avaliacaoService.getEstrelasAvaliacao(this.avaliacao, campo);
  }
}
