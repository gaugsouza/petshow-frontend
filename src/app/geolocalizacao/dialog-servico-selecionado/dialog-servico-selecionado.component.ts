import { Component, Inject, OnInit } from '@angular/core';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { Prestador } from 'src/app/interfaces/prestador';
import { ServicoDetalhado } from 'src/app/interfaces/servico-detalhado';
import { AvaliacaoService } from 'src/app/servicos/avaliacao.service';

@Component({
  selector: 'app-dialog-servico-selecionado',
  templateUrl: './dialog-servico-selecionado.component.html',
  styleUrls: ['./dialog-servico-selecionado.component.scss']
})
export class DialogServicoSelecionadoComponent implements OnInit {
  
  constructor(public ref:MatDialogRef<DialogServicoSelecionadoComponent>,
    @Inject(MAT_DIALOG_DATA) public data:ServicoDetalhado,
    private avaliacaoService:AvaliacaoService) { }

  ngOnInit = (): void => {
  }

  getPrestador():Prestador {
    return this.data.prestador;
  }

  getAvaliacoes() {
    return this.data.avaliacoes;
  }

  getMediaAvaliacoes() {
    return this.data.mediaAvaliacao || this.avaliacaoService.getMediaAvaliacao(this.getAvaliacoes());
  }

  getEndereco() {
    return this.getPrestador().endereco;
  }

  getUrl() {
    return `prestador/${this.getPrestador().id}/servicoDetalhado/${this.data.id}/agendamento`;
  }

  



}
