import { Component, OnInit, Input, Output, EventEmitter } from '@angular/core';
import { LocalStorageService } from 'src/app/servicos/local-storage.service';
import { USER_TOKEN } from 'src/app/util/constantes';
import { ServicosService } from 'src/app/servicos/servicos.service';
import { ObjetoPaginado } from 'src/app/interfaces/paginacao';
import { ServicoDetalhado } from 'src/app/interfaces/servico-detalhado';
import { PageEvent } from '@angular/material/paginator';
import { AnimalEstimacao } from 'src/app/interfaces/animalEstimacao';
import { ServicoDetalhadoTipoAnimal } from 'src/app/interfaces/servico-detalhado-tipo-animal';
import { Adicional } from 'src/app/interfaces/adicional';

@Component({
  selector: 'app-servico-detalhado',
  templateUrl: './servico-detalhado.component.html',
  styleUrls: ['./servico-detalhado.component.scss']
})
export class ServicoDetalhadoComponent implements OnInit {
  @Input() isVisualizacao: Boolean;
  @Input() idServico: number;
  @Input() idPrestador: number;
  @Input('animais') animaisSelecionados:AnimalEstimacao[] = [];
  @Output('retorna-tipos') retornaTipos = new EventEmitter<ServicoDetalhadoTipoAnimal[]>();
  @Output('retorna-adicionais') retornaAdicionais = new EventEmitter<Adicional[]>();

  servicoDetalhado: ServicoDetalhado;
  pageEvent: PageEvent;
  quantidadeTotal:number;
  quantidadeItens:number = 5;
  paginaAtual:number = 0;
  precoPorTipo:ServicoDetalhadoTipoAnimal[] = [];
  adicionais:Adicional[] = [];

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

  getInformacoesTipoServico() {
    const {precoPorTipo} = this.servicoDetalhado;
    this.precoPorTipo = precoPorTipo.filter(preco => (this.animaisSelecionados || []).filter(animal => animal.tipo.id === preco.tipoAnimal.id).length > 0);
    this.retornaTipos.emit(this.precoPorTipo);
    return this.precoPorTipo;
  }

  selecionaTipo(selecionados) {
    this.precoPorTipo = selecionados.map(el => el.value);
    this.retornaTipos.emit(this.precoPorTipo);
  }

  getDescricaoServico(preco:ServicoDetalhadoTipoAnimal):string {
    if(!preco.tipoAnimal.porte && !preco.tipoAnimal.pelagem) {
      return '';
    }

    return `(${preco.tipoAnimal.porte ? `Porte: ${preco.tipoAnimal.porte}` : ''} | ${preco.tipoAnimal.pelagem ? `Pelagem: ${preco.tipoAnimal.pelagem}` : ''})`;
  }

  selecionaAdicional(selecionados) {
    this.adicionais = selecionados.map(el => el.value);
    this.retornaAdicionais.emit(this.adicionais);
  }
}
