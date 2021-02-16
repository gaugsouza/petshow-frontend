import {
  Component, Inject, Input, OnInit,
} from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { PageEvent } from '@angular/material/paginator';
import { Agendamento } from 'src/app/interfaces/agendamento';
import { AnimalEstimacao } from 'src/app/interfaces/animalEstimacao';
import { ObjetoPaginado } from 'src/app/interfaces/paginacao';
import { StatusAgendamento } from 'src/app/interfaces/statusAgendamento';
import { AgendamentoService } from 'src/app/servicos/agendamento.service';
import { LocalStorageService } from 'src/app/servicos/local-storage.service';
import { NotificationService } from 'src/app/servicos/notification.service';
import { USER_TOKEN, STATUS_AGENDAMENTO } from 'src/app/util/constantes';
import { ConfirmacaoCancelamentoComponent } from 'src/app/perfis/confirmacao-cancelamento/confirmacao-cancelamento.component';

@Component({
  selector: 'app-agenda-prestador',
  templateUrl: './agenda-prestador.component.html',
  styleUrls: ['./agenda-prestador.component.scss'],
})
export class AgendaPrestadorComponent implements OnInit {
  @Input('prestador-id') prestadorId: number;

  agendamentos: Agendamento[];

  animaisAtendidos: AnimalEstimacao[];

  pageEvent: PageEvent;

  quantidadeTotal: number;

  quantidadeItens: number = 5;

  paginaAtual: number = 0;

  statusAgendamento: StatusAgendamento[];

  constructor(private cancelamento: MatDialog,
    private agendamentoService: AgendamentoService,
    private localStorageService: LocalStorageService,
    @Inject('AgendamentoNotificationService') private agendamentoNotification: NotificationService<Agendamento>) {}

  ngOnInit(): void {
    this.agendamentoNotification.notify({
      precoFinal: null,
      animaisAtendidos: [{
        nome: null,
        tipo: {
          id: null,
          nome: null,
        },
      }],
      servicoDetalhadoId: null,
      clienteId: null,
      prestadorId: null,
    });

    this.agendamentoNotification.obs.subscribe(() => {
      this.buscarAgendamentosPorPrestador(this.prestadorId, this.paginaAtual, this.quantidadeItens);
    });

    this.localStorageService.getItem(USER_TOKEN).subscribe((token: string) => {
      this.agendamentoService.buscarStatusAgendamento(token).subscribe((status) => {
        this.statusAgendamento = status;
      });
    });
  }

  buscarAgendamentosPorPrestador(prestadorId: number, pagina: number, quantidadeItens: number) {
    this.localStorageService.getItem(USER_TOKEN).subscribe((token: string) => {
      this.agendamentoService.buscarAgendamentosPorPrestador(prestadorId, pagina,
        quantidadeItens, token)
        .subscribe((paginaAgendamentos) => {
          const objetoPaginado:ObjetoPaginado = paginaAgendamentos;
          this.agendamentos = objetoPaginado.content;
          this.quantidadeTotal = objetoPaginado.totalElements;
          this.paginaAtual = objetoPaginado.pageable.pageNumber;
          this.quantidadeItens = objetoPaginado.size;
        });
    });
  }

  concluiAgendamento(agendamento:Agendamento) {
    const concluidoId = this.statusAgendamento.find((status) => STATUS_AGENDAMENTO.concluido
      .includes(status.nome.toUpperCase()));
    this.localStorageService.getItem(USER_TOKEN).subscribe((token : string) => {
      this.agendamentoService.alterarStatusAgendamento(agendamento.prestadorId,
        concluidoId.id, agendamento.id, token)
        .subscribe(() => {
          this.buscarAgendamentosPorPrestador(this.prestadorId, this.paginaAtual,
            this.quantidadeItens);
        });
    });
  }

  cancelaAgendamento(agendamento) {
    const cancelRef = this.cancelamento.open(ConfirmacaoCancelamentoComponent);
    cancelRef.afterClosed().subscribe((result) => {
      if (result) {
        const cancelaId = this.statusAgendamento.find((status) => STATUS_AGENDAMENTO.cancelado
          .includes(status.nome.toUpperCase()));
        this.localStorageService.getItem(USER_TOKEN).subscribe((token: string) => {
          this.agendamentoService.alterarStatusAgendamento(agendamento.prestadorId,
            cancelaId.id, agendamento.id, token)
            .subscribe(() => {
              this.buscarAgendamentosPorPrestador(this.prestadorId, this.paginaAtual,
                this.quantidadeItens);
            });
        });
      }
    });
  }

  isAtivo = (agendamento:Agendamento) => !STATUS_AGENDAMENTO.cancelado
    .includes(agendamento.status.nome.toUpperCase())
    && !STATUS_AGENDAMENTO.concluido.includes(agendamento.status.nome.toUpperCase());

  eventoPagina(event: PageEvent) {
    const pagina = event.pageIndex;
    const quantidadeItens = event.pageSize;
    this.buscarAgendamentosPorPrestador(this.prestadorId, pagina, quantidadeItens);
    return event;
  }
}
