import {
  Component, OnInit, Input, Output, EventEmitter,
} from '@angular/core';
import { LocalStorageService } from 'src/app/servicos/local-storage.service';
import { USER_TOKEN } from 'src/app/util/constantes';
import { ServicosService } from 'src/app/servicos/servicos.service';
import { ServicoDetalhado } from 'src/app/interfaces/servico-detalhado';
import { PageEvent } from '@angular/material/paginator';
import { AnimalEstimacao } from 'src/app/interfaces/animalEstimacao';
import { ServicoDetalhadoTipoAnimal } from 'src/app/interfaces/servico-detalhado-tipo-animal';
import { Adicional } from 'src/app/interfaces/adicional';
import { AgendamentoService } from 'src/app/servicos/agendamento.service';
import { MAT_MOMENT_DATE_FORMATS, MomentDateAdapter, MAT_MOMENT_DATE_ADAPTER_OPTIONS } from '@angular/material-moment-adapter';
import { DateAdapter, MAT_DATE_FORMATS, MAT_DATE_LOCALE } from '@angular/material/core';

@Component({
  selector: 'app-servico-detalhado',
  templateUrl: './servico-detalhado.component.html',
  styleUrls: ['./servico-detalhado.component.scss'],
  providers: [
    { provide: MAT_DATE_LOCALE, useValue: 'pt-BR' },
    {
      provide: DateAdapter,
      useClass: MomentDateAdapter,
      deps: [MAT_DATE_LOCALE, MAT_MOMENT_DATE_ADAPTER_OPTIONS],
    },
    { provide: MAT_DATE_FORMATS, useValue: MAT_MOMENT_DATE_FORMATS },
  ],
})
export class ServicoDetalhadoComponent implements OnInit {
  @Input() isVisualizacao: Boolean;

  @Input() idServico: number;

  @Input() idPrestador: number;

  @Input('animais') animaisSelecionados:AnimalEstimacao[] = [];

  @Output('retorna-tipos') retornaTipos = new EventEmitter<ServicoDetalhadoTipoAnimal[]>();

  @Output('retorna-adicionais') retornaAdicionais = new EventEmitter<Adicional[]>();

  @Output('recupera-data') recuperaData = new EventEmitter<Date>();

  servicoDetalhado: ServicoDetalhado;

  pageEvent: PageEvent;

  quantidadeTotal:number;

  quantidadeItens:number = 5;

  paginaAtual:number = 0;

  precoPorTipo:ServicoDetalhadoTipoAnimal[] = [];

  adicionais:Adicional[] = [];

  dataAgendamento:Date;

  dataMinima:Date;

  horariosAgendamento:string[] = [];

  constructor(private localStorageService: LocalStorageService,
    private servicosService: ServicosService,
    private agendamentoService: AgendamentoService,
    private _adapter: DateAdapter<any>) { }

  ngOnInit(): void {
    this.dataMinima = new Date();
    this.dataMinima.setDate(this.dataMinima.getDate() + 1);
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
    const { precoPorTipo } = this.servicoDetalhado;
    this.precoPorTipo = (this.animaisSelecionados || [])
      .map((animal) => animal.tipo)
      .map((tipoAnimal) => precoPorTipo.find((tipo) => tipo.tipoAnimal.id === tipoAnimal.id));

    this.retornaTipos.emit(this.precoPorTipo);
    return this.precoPorTipo;
  }

  selecionaTipo(selecionados) {
    this.precoPorTipo = selecionados.map((el) => el.value);
    this.retornaTipos.emit(this.precoPorTipo);
  }

  getDescricaoServico = (preco:ServicoDetalhadoTipoAnimal):string => {
    if (!preco.tipoAnimal.porte && !preco.tipoAnimal.pelagem) {
      return '';
    }

    return `(${preco.tipoAnimal.porte ? `Porte: ${preco.tipoAnimal.porte}` : ''} | ${preco.tipoAnimal.pelagem ? `Pelagem: ${preco.tipoAnimal.pelagem}` : ''})`;
  }

  selecionaAdicional(selecionados) {
    this.adicionais = selecionados.map((el) => el.value);
    this.retornaAdicionais.emit(this.adicionais);
  }

  selecionaData(data) {
    this.dataAgendamento = data.value._d;
    this.buscaHorariosAgendamento(this.dataAgendamento);
  }

  buscaHorariosAgendamento(data:Date) {
    this.localStorageService.getItem(USER_TOKEN).subscribe((token:string) => {
      this.agendamentoService.buscaHorariosIndisponiveis(this.idPrestador, data, token)
        .subscribe((horarios) => {
          this.horariosAgendamento = this.agendamentoService.getHorariosDisponiveis(horarios, data);
        });
    });
  }

  geraDataAtendimento(horario:string) {
    this.dataAgendamento.setHours(Number.parseInt(horario.split(':')[0], 10));
    this.recuperaData.emit(this.dataAgendamento);
  }
}
