import { Component, OnInit } from '@angular/core';
import { ServicosService } from 'src/app/servicos/servicos.service';
import { ServicoDetalhado } from 'src/app/interfaces/servico-detalhado';
import { ActivatedRoute } from '@angular/router';
import { PrestadorService } from 'src/app/servicos/prestador.service';
import { PageEvent } from '@angular/material/paginator';
import { ObjetoPaginado } from 'src/app/interfaces/paginacao';
import { MatDialog } from '@angular/material/dialog';
import { DialogComparacaoComponent } from './dialog-comparacao/dialog-comparacao.component';
import { ComparacaoWrapper } from '../interfaces/comparacao-wrapper';

@Component({
  selector: 'app-lista-servicos-detalhados',
  templateUrl: './lista-servicos-detalhados.component.html',
  styleUrls: ['./lista-servicos-detalhados.component.scss'],
})
export class ListaServicosDetalhadosComponent implements OnInit {
  servicosDetalhados:ServicoDetalhado[];

  tipoId:number;

  pageEvent: PageEvent;

  quantidadeTotal:number;

  quantidadePagina:number = 6;

  paginaAtual:number = 0;

  idsAComparar:number[] = []

  constructor(private servicosService:ServicosService,
              private route: ActivatedRoute,
              private prestadorService: PrestadorService,
              private dialog:MatDialog) {}

  ngOnInit(): void {
    this.tipoId = +this.route.snapshot.paramMap.get('id');
    this.buscarServicosDetalhadosPorTipo(this.tipoId, this.paginaAtual, this.quantidadePagina);
  }

  eventoPagina(event: PageEvent) {
    const pagina = event.pageIndex;
    const quantidadePagina = event.pageSize;
    this.buscarServicosDetalhadosPorTipo(this.tipoId, pagina, quantidadePagina);
    return event;
  }

  buscarServicosDetalhadosPorTipo(id:number, pagina?:number, quantidadeItens?:number) {
    this.servicosService.buscarServicosDetalhadosPorTipo(id, pagina, quantidadeItens)
      .subscribe((paginaServicosDetalhados) => {
        const objetoPaginado:ObjetoPaginado = JSON.parse(paginaServicosDetalhados);
        const servicos = objetoPaginado.content;
        this.servicosDetalhados = servicos;
        this.quantidadeTotal = objetoPaginado.totalElements;
        this.paginaAtual = objetoPaginado.pageable.pageNumber;
        this.quantidadePagina = objetoPaginado.size;
      });
  }

  getPrecoMinimo(servico:ServicoDetalhado):number {
    const menorPreco = Math.min(...servico.precoPorTipo.map(preco => preco.preco))
    return menorPreco;
  }

  selecionaIds(checked:boolean, id:number) {
    if(!checked) {
      this.idsAComparar = this.idsAComparar.filter(el => el !== id);
    } else {
      this.idsAComparar = [...this.idsAComparar, id];
    }
  }

  deveDesabilitar(id:number):boolean {
    return this.idsAComparar.length === 2 && !this.idsAComparar.includes(id);
  }

  compararServicos() {
    this.servicosService.buscarServicosComparacao(this.idsAComparar).subscribe(el => {
      this.openDialog(JSON.parse(el));
    });
  }

  openDialog(comparacao:ComparacaoWrapper) {
    const ref = this.dialog.open(DialogComparacaoComponent, {
      width: '1200px',
      data: {...comparacao}
    });

    ref.afterClosed().subscribe(() => {
      this.idsAComparar = [];
    })
  }
}
