import { Component, OnInit } from '@angular/core';
import { ServicosService } from 'src/app/servicos/servicos.service';
import { ServicoDetalhado } from 'src/app/interfaces/servico-detalhado';
import { ActivatedRoute } from '@angular/router';
import { PrestadorService } from 'src/app/servicos/prestador.service';
import { PageEvent } from '@angular/material/paginator';
import { ObjetoPaginado } from 'src/app/interfaces/paginacao';
import { FiltroServicos } from '../interfaces/filtro-servicos';
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

  ordenacao:any = {
    precoMin: "Menor preço",
    precoMax: "Maior Preço",
    nomePrestador: "Nome Prestador",
    avaliacao: "Avaliação"
  }

  private NOTA_MAXIMA = 5;

  mediaAvaliacao:number = 0;
  
  filtroAdicional:boolean = false;

  filtro:FiltroServicos;

  precoMin:number;

  precoMax:number;
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

  getOrdenacaoKeys() {
    return Object.keys(this.ordenacao);
  }

  atualizaMediaAvaliacao(valor:number) {
    this.mediaAvaliacao = valor;
    this.filtro = { ...this.filtro, notaMedia: this.mediaAvaliacao }
    this.atualizaFiltro(this.filtro);
  }

  atualizaFiltro(filtro:FiltroServicos) {
    console.log(this.servicosService.geraFiltroString(filtro));
  }

  getEstrelas(): any[] {
    const estrelasEmBranco = this.NOTA_MAXIMA - this.mediaAvaliacao;
    const estrelas:any[string] = [
      [...Array(this.mediaAvaliacao).keys()].map(() => 'star'),
      [...Array(estrelasEmBranco).keys()].map(() => 'star_border')
    ]

    return estrelas.flatMap((el:string) => el);
  }

  toggleFiltroAdicional() {
    this.filtroAdicional = !this.filtroAdicional;
    this.filtro = { ... this.filtro, possuiAdicionais: this.filtroAdicional};
    this.atualizaFiltro(this.filtro);
  }

  alteraOrdenacao(chave:string) {
    this.filtro = {...this.filtro, ordenacao: chave};
    this.atualizaFiltro(this.filtro);
  }

  blurInputs(campo, valor) {
    this.filtro[campo] = valor;
    this.atualizaFiltro(this.filtro);
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
