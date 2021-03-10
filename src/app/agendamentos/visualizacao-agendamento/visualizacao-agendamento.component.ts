import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { Agendamento } from 'src/app/interfaces/agendamento';
import { Avaliacao } from 'src/app/interfaces/avaliacao';
import { AgendamentoService } from 'src/app/servicos/agendamento.service';
import { LocalStorageService } from 'src/app/servicos/local-storage.service';
import { STATUS_AGENDAMENTO, USER_TOKEN } from 'src/app/util/constantes';
import { JwtHelper } from 'src/app/util/jwt-helper';
import { UsuarioService } from 'src/app/servicos/usuario.service';
import { Usuario } from 'src/app/interfaces/usuario';
import { TipoPessoa } from 'src/app/enum/tipo-pessoa.enum';
import { Negociacao } from 'src/app/interfaces/negociacao';
import { PagamentoService } from 'src/app/servicos/pagamento.service';
import { MERCADO_PAGO_URL } from 'src/app/util/url';

@Component({
  selector: 'app-visualizacao-agendamento',
  templateUrl: './visualizacao-agendamento.component.html',
  styleUrls: ['./visualizacao-agendamento.component.scss'],
})
export class VisualizacaoAgendamentoComponent implements OnInit {
  idUsuario:number;

  idAgendamento:number;

  status:string;

  agendamento:Agendamento;

  isFormVisible:boolean;

  redirectTo:string = '';

  isCliente:boolean = false;

  avaliacaoBase:Avaliacao = {
    atencao: 0,
    qualidadeProdutos: 0,
    custoBeneficio: 0,
    infraestrutura: 0,
    qualidadeServico: 0,
    comentario: null,
  }

  avaliacao: Avaliacao;

  constructor(private route:ActivatedRoute,
              private localStorageService:LocalStorageService,
              private agendamentoService:AgendamentoService,
              private helper:JwtHelper,
              private clienteService:UsuarioService,
              private pagamentoService: PagamentoService) { }

  ngOnInit(): void {
    this.idAgendamento = +this.route.snapshot.paramMap.get('idAgendamento');
    this.status = this.route.snapshot.paramMap.get('status');
    if (this.status) {
      this.atualizaStatus(this.idAgendamento, this.status);
    } else {
      this.buscaAgendamento();
    }
  }

  buscaAgendamento() {
    this.localStorageService.getItem(USER_TOKEN).subscribe((token:string) => {
      this.idUsuario = this.helper.recuperaIdToken(token);
      this.agendamentoService.ativarAgendamento(this.idAgendamento, this.idUsuario, token)
        .subscribe((agendamento:Agendamento) => {
          this.agendamento = agendamento;
          this.clienteService.getUsuario(token).subscribe((usuario:Usuario) => {
            this.isCliente = (usuario || {}).tipo === TipoPessoa.CLIENTE || false;
            if (agendamento.status.id === 4 && this.isCliente) {
              this.geraPreference(agendamento.id, agendamento.cliente.id);
            }
          }, () => {
            this.isCliente = false;
          });
        });
    });

    this.buscaAvaliacao(this.idAgendamento);
  }

  abreFormulario() {
    this.isFormVisible = !this.isFormVisible;
  }

  getPrecosPorTipo = (agendamento:Agendamento) => {
    const { animaisAtendidos, servicoDetalhado } = agendamento;

    return servicoDetalhado.precoPorTipo.filter((tipo) => animaisAtendidos
      .filter((animal) => animal.tipo.id === tipo.tipoAnimal.id).length > 0);
  }

  isAgendamentoConcluido = (agendamento:Agendamento) :boolean => STATUS_AGENDAMENTO.concluido
    .includes(agendamento.status.nome.toUpperCase());

  isAgendamentoAvaliado = ():boolean => !!this.avaliacao;

  buscaAvaliacao(agendamentoId:number) {
    this.localStorageService.getItem(USER_TOKEN).subscribe((token:string) => {
      this.agendamentoService.buscarAvaliacaoPorAgendamento(agendamentoId, token)
        .subscribe((avaliacao:Avaliacao) => {
          this.avaliacao = avaliacao;
        });
    });
  }

  adicionaAvaliacao(avaliacao:Avaliacao) {
    this.avaliacao = {
      atencao: avaliacao.atencao,
      custoBeneficio: avaliacao.custoBeneficio,
      infraestrutura: avaliacao.infraestrutura,
      qualidadeProdutos: avaliacao.qualidadeProdutos,
      qualidadeServico: avaliacao.qualidadeServico,
      comentario: avaliacao.comentario,
      cliente: { id: this.idUsuario },
      servicoAvaliadoId: this.agendamento.servicoDetalhadoId,
    };

    this.localStorageService.getItem(USER_TOKEN).subscribe((token:string) => {
      this.agendamentoService.adicionarAvaliacao(this.idAgendamento, this.avaliacao, token)
        .subscribe((retorno:Avaliacao) => {
          this.avaliacao = retorno;
        });
    });
  }

  fechaFormulario() {
    this.isFormVisible = false;
    this.avaliacaoBase = {
      atencao: 0,
      qualidadeProdutos: 0,
      custoBeneficio: 0,
      infraestrutura: 0,
      qualidadeServico: 0,
      comentario: null,
    };
  }

  atualizaNegociacao(negociacao:Negociacao) {
    this.localStorageService.getItem(USER_TOKEN).subscribe((token:string) => {
      this.agendamentoService.confirmarNegociacao(this.agendamento.id,
        this.agendamento.prestadorId, negociacao, token)
        .subscribe(() => {
          this.buscaAgendamento();
        });
    });
  }

  atualizaStatus(agendamentoId: number, status: string) {
    this.localStorageService.getItem(USER_TOKEN).subscribe((token:string) => {
      const statusId = this.recuperaStatusId(status);
      const usuarioId = this.helper.recuperaIdToken(token);

      this.agendamentoService.alterarStatusAgendamento(usuarioId,
        statusId, agendamentoId, token).subscribe(() => {
        this.buscaAgendamento();
      });
    });
  }

  recuperaStatusId = (status:string) => {
    if (status === 'success') {
      return 1; // AGENDADO
    }
    if (status === 'pending') {
      return 5; // OFERTA_SOLICITADA
    }
    if (status === 'failure') {
      return 4; // PENDENTE_PAGAMENTO
    }
    return 3; // CANCELADO
  }

  geraPreference(agendamentoId:number, usuarioId:number) {
    this.localStorageService.getItem(USER_TOKEN).subscribe((token:string) => {
      this.pagamentoService.recuperaPreference(agendamentoId,
        usuarioId, token).subscribe((response) => {
        const script = document.createElement('script');

        script.src = MERCADO_PAGO_URL;
        script.type = 'text/javascript';
        script.dataset.preferenceId = response.preferenceId;
        script.dataset.buttonLabel = 'Efetuar Pagamento';

        document.getElementById('button-checkout').innerHTML = '';
        document.querySelector('#button-checkout').appendChild(script);
      });
    });
  }
}
