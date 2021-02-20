import { Component, Inject, OnInit } from '@angular/core';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { Prestador } from 'src/app/interfaces/prestador';
import { AvaliacaoService } from 'src/app/servicos/avaliacao.service';

@Component({
  selector: 'app-dialog-servico-selecionado',
  templateUrl: './dialog-servico-selecionado.component.html',
  styleUrls: ['./dialog-servico-selecionado.component.scss'],
})
export class DialogServicoSelecionadoComponent implements OnInit {
  tooltipText:string;

  constructor(public ref:MatDialogRef<DialogServicoSelecionadoComponent>,
    @Inject(MAT_DIALOG_DATA) public data:any,
    private avaliacaoService:AvaliacaoService) { }

  ngOnInit = (): void => {}

  geraTooltip() {
    return !this.getIsLogado() ? 'NECESSARIO_LOGAR' : !this.getIsCliente() ? 'SOMENTE_CLIENTES' : !this.getIsAtivo() ? 'ATIVE_CONTA_AGENDAMENTO' : '';
  }

  getIsAtivo() {
    return (this.data || {}).isAtivo;
  }

  getIsCliente() {
    return (this.data || {}).isCliente;
  }

  getIsLogado() {
    return (this.data || {}).isLogado;
  }

  getPrestador():Prestador {
    return this.getServico().prestador;
  }

  getServico() {
    return (this.data || {}).servico;
  }

  getAvaliacoes() {
    return this.getServico().avaliacoes;
  }

  getMediaAvaliacoes() {
    return this.getServico().mediaAvaliacao
    || this.avaliacaoService.getMediaAvaliacao(this.getAvaliacoes());
  }

  getEndereco() {
    return this.getPrestador().endereco;
  }

  getUrl() {
    return `prestador/${this.getPrestador().id}/servicoDetalhado/${this.getServico().id}/agendamento`;
  }

  fechaModal() {
    this.ref.close();
  }
}
