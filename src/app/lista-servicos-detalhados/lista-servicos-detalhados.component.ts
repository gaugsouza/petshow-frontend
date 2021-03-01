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
import { Usuario } from '../interfaces/usuario';
import { DataSharingService } from '../servicos/data-sharing.service';
import { Prestador } from '../interfaces/prestador';
import { GeolocalizacaoService } from '../servicos/geolocalizacao.service';
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

  filtro:FiltroServicos = { };

  menorPreco:number;

  maiorPreco:number;

  idsAComparar:number[] = [];

  isCliente:boolean;

  isAtivo:boolean;

  tooltipText:string;

  isLogado:boolean = false;

  constructor(private servicosService:ServicosService,
              private route: ActivatedRoute,
              private dialog:MatDialog,
              private usuarioService:UsuarioService,
              private localStorageService:LocalStorageService,
              private dataSharingService:DataSharingService,
              private geolocalizacaoService:GeolocalizacaoService) {}

  ngOnInit(): void {
    this.tipoId = +this.route.snapshot.paramMap.get('id');
    this.filtro.tipoServicoId = this.tipoId;
    this.montaFiltroEstado();
  }

  montaFiltroEstado() {
    this.route.queryParams.subscribe(params => {
      const { estado = 'SP', cidade = 'São Paulo' } = params;
      this.filtro = { ...this.filtro, cidade, estado };
       navigator.geolocation.getCurrentPosition((pos) => {
         const { coords: {latitude, longitude}} = pos;
         this.filtro = { ...this.filtro, metrosGeoloc: 600, posicaoAtual: { geolocLongitude: longitude.toString(), geolocLatitude: latitude.toString() } };
         this.buscaUsuario();
       },
       () => {
         this.filtro = { ...this.filtro, posicaoAtual: {geolocLongitude: null, geolocLatitude: null}, metrosGeoloc: 600 };
         this.buscaUsuario();
       })
    },
    () => {},
    () =>{
    });
  }

  buscaUsuario() {
    this.localStorageService.getItem(USER_TOKEN).subscribe((token:string) => {
      this.usuarioService.getUsuario(token).subscribe((usuario:Usuario) => {
        this.isLogado = true;
        this.isCliente = this.usuarioService.isCliente(usuario);
        this.isAtivo = this.usuarioService.isAtivo(usuario);

        if (this.isCliente) {
          if(!this.filtro.posicaoAtual.geolocLatitude) {
            console.log('É cliente e o filtro tá nulo');
            this.filtro = {
              ...this.filtro,
              metrosGeoloc: 600,
              posicaoAtual: { ...(usuario || {}).geolocalizacao },
            };
          }
        }
      }, () => {
        this.isCliente = false;
        this.isAtivo = false;
      },
      () => {
        this.tooltipText = this.geraTooltip();
        this.validaGeolocalizacao(this.filtro);
      });
    });
  }

  validaGeolocalizacao(filtro:FiltroServicos) {
    this.geolocalizacaoService.buscaGeolocCidade(filtro.cidade, filtro.estado).subscribe((retorno:string) => {
      const geolocs = JSON.parse(retorno);
      const { posicaoAtual } = filtro;
      const [ cidade, , centroCidade ] = geolocs;
      const { boundingbox } = cidade;
      const [latMin, latMax, lonMin, lonMax] = boundingbox;
      console.log('informações', latMin, latMax, lonMin, lonMax, posicaoAtual);
      console.log('latMin', Number.parseFloat(latMin), Number.parseFloat((posicaoAtual || {}).geolocLatitude || '0'), Number.parseFloat(latMin) <= Number.parseFloat((posicaoAtual || {}).geolocLatitude || '0'));
      console.log('latMax', Number.parseFloat(latMax), Number.parseFloat((posicaoAtual || {}).geolocLatitude || '0'), Number.parseFloat(latMax) >= Number.parseFloat((posicaoAtual || {}).geolocLatitude || '0'));
      console.log('lonMin',Number.parseFloat(lonMin),  Number.parseFloat((posicaoAtual || {}).geolocLongitude ||'0'), Number.parseFloat(lonMin) <= Number.parseFloat((posicaoAtual || {}).geolocLongitude ||'0'));
      console.log('longMax', Number.parseFloat(lonMax), Number.parseFloat((posicaoAtual || {}).geolocLongitude || '0'), Number.parseFloat(lonMax) >= Number.parseFloat((posicaoAtual || {}).geolocLongitude || '0'))
      console.log(centroCidade);

      if(!(Number.parseFloat(latMin) <= Number.parseFloat((posicaoAtual || {}).geolocLatitude || '0')) || !(Number.parseFloat(latMax) >= Number.parseFloat((posicaoAtual || {}).geolocLatitude || '0'))) {
        console.log('entrou');
        posicaoAtual.geolocLatitude = centroCidade.lat;
      }

      if(!(Number.parseFloat(lonMin) <= Number.parseFloat((posicaoAtual || {}).geolocLongitude ||'0')) || !(Number.parseFloat(lonMax) >= Number.parseFloat((posicaoAtual || {}).geolocLongitude || '0'))) {
        console.log('entrou 2')
        posicaoAtual.geolocLongitude = centroCidade.lon;
      }

      this.filtro = { ...this.filtro, posicaoAtual };
      console.log('filtro', this.filtro)

    },
    () => {

    }, 
    ()=>{
      this.buscarServicosDetalhadosPorTipo(this.filtro, this.paginaAtual, this.quantidadePagina);
    })
  }

  geraTooltip() {
    return !this.isLogado ? 'NECESSARIO_LOGAR' : !this.isCliente ? 'SOMENTE_CLIENTES' : !this.isAtivo ? 'ATIVE_CONTA_AGENDAMENTO' : '';
  }

  eventoPagina(event: PageEvent) {
    const pagina = event.pageIndex;
    const quantidadePagina = event.pageSize;
    this.buscarServicosDetalhadosPorTipo(this.filtro, pagina, quantidadePagina);

    return event;
  }

  buscarServicosDetalhadosPorTipo(filtro:FiltroServicos, pagina?:number, quantidadeItens?:number) {
    this.dataSharingService.filtroShared.next(filtro);
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

  resetaAvaliacoes() {
    this.mediaAvaliacao = 0;
    this.filtro.mediaAvaliacao = null;
    this.atualizaFiltro(this.filtro);
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

  deveSelecionar(id:number) {
    return this.idsAComparar.includes(id);
  }

  geraTitulo(prestador:Prestador) {
    if (!prestador.empresa.id) {
      return prestador.nome;
    }

    return prestador.empresa.razaoSocial || prestador.empresa.nome;
  }

  alteraFiltro(filtro) {
    this.filtro = { ...this.filtro, ...filtro };
    this.atualizaFiltro(this.filtro);
  }

  alteraValorSlider(valor) {
    this.alteraFiltro({ ...this.filtro, metrosGeoloc: valor });
  }

  formatLabel = (value: number) => {
    if (value >= 1000) {
      return `${Math.round(value / 1000)}km`;
    }

    return `${value}m`;
  }
}
