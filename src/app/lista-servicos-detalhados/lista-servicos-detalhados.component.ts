import { Component, OnInit } from '@angular/core';
import { ServicosService } from 'src/app/servicos/servicos.service';
import { ServicoDetalhado } from 'src/app/interfaces/servico-detalhado';
import { ActivatedRoute } from '@angular/router';
import { PageEvent } from '@angular/material/paginator';
import { ObjetoPaginado } from 'src/app/interfaces/paginacao';
import { MatDialog } from '@angular/material/dialog';
import { DialogComparacaoComponent } from 'src/app/lista-servicos-detalhados/dialog-comparacao/dialog-comparacao.component';
import { ComparacaoWrapper } from 'src/app/interfaces/comparacao-wrapper';
import { FiltroServicos } from 'src/app/interfaces/filtro-servicos';
import { UsuarioService } from 'src/app/servicos/usuario.service';
import { LocalStorageService } from 'src/app/servicos/local-storage.service';
import { USER_TOKEN } from '../util/constantes';

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
    menorPreco: 'Preço Crescente',
    maiorPreco: 'Preço Decrescente',
    mediaAvaliacao: 'Melhor Avaliado',
  }

  private NOTA_MAXIMA = 5;

  mediaAvaliacao:number = 0;

  filtroAdicional:boolean = false;

  filtro:FiltroServicos = { tipoServicoId: null };

  menorPreco:number;

  maiorPreco:number;

  idsAComparar:number[] = [];

  isCliente:boolean;

  isAtivo:boolean;

  constructor(private servicosService:ServicosService,
              private route: ActivatedRoute,
              private dialog:MatDialog,
              private usuarioService:UsuarioService,
              private localStorageService:LocalStorageService) {}

  ngOnInit(): void {
    this.tipoId = +this.route.snapshot.paramMap.get('id');
    this.filtro.tipoServicoId = this.tipoId;
    this.buscarServicosDetalhadosPorTipo(this.filtro, this.paginaAtual, this.quantidadePagina);
    this.buscaUsuario();
  }

  buscaUsuario() {
    this.localStorageService.getItem(USER_TOKEN).subscribe((token:string) => {
      this.usuarioService.getUsuario(token).subscribe((usuario) => {
        this.isCliente = this.usuarioService.isCliente(usuario);
        this.isAtivo = this.usuarioService.isAtivo(usuario);
      }, () => {
        this.isCliente = false;
      });
    })
  }

  eventoPagina(event: PageEvent) {
    const pagina = event.pageIndex;
    const quantidadePagina = event.pageSize;
    this.buscarServicosDetalhadosPorTipo(this.filtro, pagina, quantidadePagina);

    return event;
  }

  buscarServicosDetalhadosPorTipo(filtro:FiltroServicos, pagina?:number, quantidadeItens?:number) {
    this.servicosService.buscarServicosDetalhadosPorTipo(filtro, pagina, quantidadeItens)
      .subscribe((paginaServicosDetalhados) => {
        const objetoPaginado:ObjetoPaginado = JSON.parse(paginaServicosDetalhados);
        const servicos = objetoPaginado.content;

        this.servicosDetalhados = servicos;
        this.quantidadeTotal = objetoPaginado.totalElements;
        this.paginaAtual = objetoPaginado.pageable.pageNumber;
        this.quantidadePagina = objetoPaginado.size;
      });
  }

  getPrecoMinimo = (servico:ServicoDetalhado):number => {
    const menorPreco = Math.min(...servico.precoPorTipo.map((preco) => preco.preco));
    return menorPreco;
  }

  getOrdenacaoKeys() {
    return Object.keys(this.ordenacao);
  }

  atualizaMediaAvaliacao(valor:number) {
    this.mediaAvaliacao = valor;
    this.filtro = { ...this.filtro, mediaAvaliacao: this.mediaAvaliacao };
    this.atualizaFiltro(this.filtro);
  }

  atualizaFiltro(filtro:FiltroServicos) {
    this.buscarServicosDetalhadosPorTipo(filtro, this.paginaAtual, this.quantidadePagina);
  }

  getEstrelas(): any[] {
    const estrelasEmBranco = this.NOTA_MAXIMA - this.mediaAvaliacao;
    const estrelas:any[string] = [
      [...Array(this.mediaAvaliacao).keys()].map(() => 'star'),
      [...Array(estrelasEmBranco).keys()].map(() => 'star_border'),
    ];

    return estrelas.flatMap((el:string) => el);
  }

  toggleFiltroAdicional() {
    this.filtroAdicional = !this.filtroAdicional;
    this.filtro = { ...this.filtro, possuiAdicionais: this.filtroAdicional };
    this.atualizaFiltro(this.filtro);
  }

  alteraOrdenacao(chave:string) {
    this.filtro = { ...this.filtro, ordenacao: chave };
    this.atualizaFiltro(this.filtro);
  }

  blurInputs(campo, valor) {
    this.filtro[campo] = valor;
    this.atualizaFiltro(this.filtro);
  }

  selecionaIds(checked:boolean, id:number) {
    if (!checked) {
      this.idsAComparar = this.idsAComparar.filter((el) => el !== id);
    } else {
      this.idsAComparar = [...this.idsAComparar, id];
    }
  }

  deveDesabilitar(id:number):boolean {
    return this.idsAComparar.length === 2 && !this.idsAComparar.includes(id);
  }

  compararServicos() {
    this.servicosService.buscarServicosComparacao(this.idsAComparar).subscribe((el) => {
      this.openDialog(JSON.parse(el));
    });
  }

  openDialog(comparacao:ComparacaoWrapper) {
    const ref = this.dialog.open(DialogComparacaoComponent, {
      width: '1200px',
      data: { ...comparacao },
    });

    ref.afterClosed().subscribe(() => {
      this.idsAComparar = [];
    });
  }
}
