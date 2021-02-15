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
import { STATUS_AGENDAMENTO, USER_TOKEN } from 'src/app/util/constantes';
import { ConfirmacaoCancelamentoComponent } from '../confirmacao-cancelamento/confirmacao-cancelamento.component';

@Component({
  selector: 'app-agenda-cliente',
  templateUrl: './agenda-cliente.component.html',
  styleUrls: ['./agenda-cliente.component.scss'],
})
export class AgendaClienteComponent implements OnInit {
  @Input('cliente-id') clienteId: number;

  @Input('confirmaCancelamento') confirmaCancelamento: Boolean;

  agendamentos: Agendamento[];

  animaisAtendidos: AnimalEstimacao[];

  pageEvent: PageEvent;

  quantidadeTotal:number;

  quantidadeItens:number = 5;

  paginaAtual:number = 0;

  statusAgendamento: StatusAgendamento[];

  constructor(private cancelamento: MatDialog,
    private agendamentoService:AgendamentoService,
    private localStorageService:LocalStorageService,
    @Inject('AgendamentoNotificationService') private agendamentoNotification: NotificationService<Agendamento>) { }

  ngOnInit(): void {
    this.agendamentoNotification.notify({
      precoFinal: null,
      animaisAtendidos: [{ nome: null, tipo: { id: null, nome: null } }],
      servicoDetalhadoId: null,
      clienteId: null,
      prestadorId: null,
    });

    this.agendamentoNotification.obs.subscribe(() => {
      this.buscarAgendamentosPorCliente(this.clienteId, this.paginaAtual, this.quantidadeItens);
    });

    this.localStorageService.getItem(USER_TOKEN).subscribe((token : string) => {
      this.agendamentoService.buscarStatusAgendamento(token).subscribe((status) => {
        this.statusAgendamento = status;
      });
    });
  }

  buscarAgendamentosPorCliente(clienteId:number, pagina:number, quantidadeItens:number) {
    this.localStorageService.getItem(USER_TOKEN).subscribe((token : string) => {
      this.agendamentoService.buscarAgendamentosPorCliente(clienteId, pagina,
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

  cancelaAgendamento(agendamento:Agendamento) {
    const cancelRef = this.cancelamento.open(ConfirmacaoCancelamentoComponent,
      {
        data: "DESEJA_CONFIRMAR_CANCELAMENTO"
      });
    cancelRef.afterClosed().subscribe((result) => {
      if (result) {
        const cancelaId = this.statusAgendamento.find((status) => STATUS_AGENDAMENTO.cancelado
          .includes(status.nome.toUpperCase()));
        this.localStorageService.getItem(USER_TOKEN).subscribe((token : string) => {
          this.agendamentoService.alterarStatusAgendamento(agendamento.prestadorId, cancelaId.id,
            agendamento.id, token)
            .subscribe(() => {
              this.buscarAgendamentosPorCliente(this.clienteId, this.paginaAtual,
                this.quantidadeItens);
            });
        });
      }
    });
  }

  isAtivo = (agendamento:Agendamento) => !STATUS_AGENDAMENTO.cancelado
    .includes(agendamento.status.nome.toUpperCase()) && !STATUS_AGENDAMENTO.concluido
    .includes(agendamento.status.nome.toUpperCase());
}
