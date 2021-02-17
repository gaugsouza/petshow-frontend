import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { LocalStorageService } from 'src/app/servicos/local-storage.service';
import { AgendamentoService } from 'src/app/servicos/agendamento.service';
import { JwtHelper } from 'src/app/util/jwt-helper';
import { USER_TOKEN } from 'src/app/util/constantes';
import { Agendamento } from 'src/app/interfaces/agendamento';
import { AnimalEstimacao } from 'src/app/interfaces/animalEstimacao';
import { Cliente } from 'src/app/interfaces/cliente';
import { ServicoDetalhado } from 'src/app/interfaces/servico-detalhado';
import { Location, DatePipe } from '@angular/common';
import { ServicosService } from 'src/app/servicos/servicos.service';
import { ServicoDetalhadoTipoAnimal } from 'src/app/interfaces/servico-detalhado-tipo-animal';
import { Adicional } from 'src/app/interfaces/adicional';

@Component({
  selector: 'app-agendamento',
  templateUrl: './agendamento.component.html',
  styleUrls: ['./agendamento.component.scss'],
})
export class AgendamentoComponent implements OnInit {
  token:string;

  idServico: number;

  idPrestador: number;

  idCliente: number;

  idAgendamento: number;

  cliente: Cliente;

  animaisEstimacao: AnimalEstimacao[];

  servicoDetalhado: ServicoDetalhado;

  agendamento: Agendamento;

  isVisualizacao: boolean;

  comentario: string;

  precoFinal: number;

  servicoSelecionado:ServicoDetalhado;

  precoPorTipo:ServicoDetalhadoTipoAnimal[];

  adicionais:Adicional[];

  dataAgendamento:Date;

  erroAgendamento:string;

  constructor(private route:ActivatedRoute,
    private localStorageService:LocalStorageService,
    private agendamentoService: AgendamentoService,
    private router:Router,
    private location: Location,
    private jwtHelper: JwtHelper,
    private servicoService:ServicosService,
    private datePipe: DatePipe) {}

  ngOnInit(): void {
    this.localStorageService.getItem(USER_TOKEN).subscribe((token:string) => {
      if (!token) {
        this.router.navigate(['/login'], { queryParams: { redirectTo: this.location.path().split('?')[0] } });
        return;
      }
      this.token = token;
      this.idCliente = this.jwtHelper.recuperaIdToken(this.token);
    });

    this.route.queryParams.subscribe((params) => {
      this.isVisualizacao = JSON.parse(params.isVisualizacao) || false;
      this.idAgendamento = this.isVisualizacao ? +this.route.snapshot.paramMap.get('agendamentoId') : null;
    });

    this.idPrestador = +this.route.snapshot.paramMap.get('prestadorId');
    this.idServico = +this.route.snapshot.paramMap.get('servicoDetalhadoId');

    this.servicoService.buscarPorPrestadorIdEServicoId(this.idPrestador, this.idServico)
      .subscribe((servico) => {
        this.servicoSelecionado = JSON.parse(servico);
      });
  }

  recuperaAnimaisEstimacaoSelecionados(animaisEstimacao) {
    this.animaisEstimacao = animaisEstimacao;
  }

  recuperaPrecoPorTipo(precoPorTipo) {
    this.precoPorTipo = precoPorTipo;
  }

  recuperaAdicionais(adicionais) {
    this.adicionais = adicionais;
  }

  criarAgendamento() {
    this.agendamento = {
      clienteId: this.idCliente,
      prestadorId: this.idPrestador,
      servicoDetalhadoId: this.servicoSelecionado.id,
      animaisAtendidosIds: [...(this.animaisEstimacao || []).map((el) => el.id)],
      adicionaisIds: [...(this.adicionais || []).map((el) => el.id)],
      data: this.datePipe.transform(this.dataAgendamento, 'dd/MM/yyyy HH:mm'),
    };

    this.localStorageService.getItem(USER_TOKEN).subscribe((token:string) => {
      this.agendamentoService.adicionarAgendamento(this.agendamento, token)
        .subscribe((agendamento:Agendamento) => {
          this.router.navigate([`/agendamento-sucesso/${agendamento.id}`]);
        }, ({ error }) => {
          this.erroAgendamento = error;
        });
    });
  }

  recuperaDataAtendimento(data:Date) {
    this.dataAgendamento = data;
  }
}
