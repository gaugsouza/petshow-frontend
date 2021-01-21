import { Component, OnInit, Input, Output, EventEmitter } from '@angular/core';
import { LocalStorageService } from 'src/app/servicos/local-storage.service';
import { USER_TOKEN } from 'src/app/util/constantes';
import { ServicosService } from 'src/app/servicos/servicos.service';
import { ObjetoPaginado } from 'src/app/interfaces/paginacao';
import { ServicoDetalhado } from 'src/app/interfaces/servico-detalhado';
import { PageEvent } from '@angular/material/paginator';

@Component({
  selector: 'app-servico-detalhado',
  templateUrl: './servico-detalhado.component.html',
  styleUrls: ['./servico-detalhado.component.scss']
})
export class ServicoDetalhadoComponent implements OnInit {
  @Input() isVisualizacao: Boolean;
  @Input() idServico: number;
  @Input() idPrestador: number;

  servicoDetalhado: ServicoDetalhado;
  pageEvent: PageEvent;
  quantidadeTotal:number;
  quantidadeItens:number = 5;
  paginaAtual:number = 0;
  
  constructor(private localStorageService: LocalStorageService,
    private servicosService: ServicosService) { }

  ngOnInit(): void {
    this.buscarPorPrestadorIdEServicoId(this.idPrestador, this.idServico);
  }

  buscarPorPrestadorIdEServicoId(prestadorId:number, servicoDetalhadoId:number) {
    this.localStorageService.getItem(USER_TOKEN).subscribe((token : string) => {
      this.servicosService.buscarPorPrestadorIdEServicoId(prestadorId, servicoDetalhadoId, token)
        .subscribe((servicoDetalhado) => {
          this.servicoDetalhado = servicoDetalhado;
        });
    });
  }
}
