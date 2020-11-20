import { Component, OnInit,Input, Output, EventEmitter } from '@angular/core';
import { ServicoDetalhado } from 'src/app/interfaces/servico-detalhado';
import { PageEvent } from '@angular/material/paginator';
import { ServicosService } from 'src/app/servicos/servicos.service';
import { LocalStorageService } from 'src/app/servicos/local-storage.service';
import { USER_TOKEN } from 'src/app/util/constantes';
import { ObjetoPaginado } from 'src/app/interfaces/paginacao';

@Component({
  selector: 'app-servicos',
  templateUrl: './servicos.component.html',
  styleUrls: ['./servicos.component.scss']
})
export class ServicosComponent implements OnInit {
  @Input('prestador-id') prestadorId: number;
  @Output('remover-servico') removerServico = new EventEmitter<ServicoDetalhado>();

  servicosDetalhados: ServicoDetalhado[];

  pageEvent: PageEvent;
  quantidadeTotal:number;
  quantidadeItens:number = 5;
  paginaAtual:number = 0;

  constructor(private servicosService: ServicosService,
              private localStorageService: LocalStorageService) { }

  ngOnInit(): void {
    this.buscarServicosDetalhadosPorPrestador(this.prestadorId, this.paginaAtual, this.quantidadeItens);
  }

  removeServico(servico:ServicoDetalhado) {
    console.log(servico);
    this.removerServico.emit(servico);
  }

  buscarServicosDetalhadosPorPrestador(prestadorId:number, pagina:number, quantidadeItens:number){
    this.localStorageService.getItem(USER_TOKEN).subscribe((token : string) => {
      this.servicosService.buscarServicosDetalhadosPorPrestador(prestadorId, pagina, quantidadeItens, token)
        .subscribe(paginaServicosDetalhados => {
          let objetoPaginado:ObjetoPaginado = paginaServicosDetalhados;

          this.servicosDetalhados = objetoPaginado.content;

          this.quantidadeTotal = objetoPaginado.totalElements
          this.paginaAtual = objetoPaginado.pageable.pageNumber;
          this.quantidadeItens = objetoPaginado.size;
        });
    });
  }

  eventoPagina(event: PageEvent){
    let pagina = event.pageIndex;
    let quantidadeItens = event.pageSize;
    
    this.buscarServicosDetalhadosPorPrestador(this.prestadorId, pagina, quantidadeItens);

    return event;
  }
}
