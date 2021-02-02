import { Component, OnInit } from '@angular/core';
import { Agendamento } from 'src/app/interfaces/agendamento';
import { StatusAgendamento } from 'src/app/interfaces/statusAgendamento';
import { AgendamentoService } from 'src/app/servicos/agendamento.service';
import { LocalStorageService } from 'src/app/servicos/local-storage.service';

@Component({
  selector: 'app-confirmacao-cancelamento',
  templateUrl: './confirmacao-cancelamento.component.html',
  styleUrls: ['./confirmacao-cancelamento.component.scss']
})
export class ConfirmacaoCancelamentoComponent implements OnInit {

  agendamento: Agendamento;
  statusAgendamento: StatusAgendamento[];
  confirmacaoCancelamento: Boolean;

  constructor(
    private agendamentoService:AgendamentoService,
    private localStorageService:LocalStorageService,
  ) { }

  ngOnInit(): void {
  }

  botaoConfirmaCancelamento() {
    this.confirmacaoCancelamento = !this.confirmacaoCancelamento;
  }

  // cancelaAgendamento(agendamento){
  //   const cancelaId = this.statusAgendamento.find(status => status.nome.toLowerCase().indexOf("cancelado")!==-1)
  //   this.localStorageService.getItem(USER_TOKEN).subscribe((token : string) => {
  //     this.agendamentoService.alterarStatusAgendamento(agendamento.prestadorId, cancelaId.id, agendamento.id, token)
  //     .subscribe(() => {
  //       this.buscarAgendamentosPorCliente(this.clienteId, this.paginaAtual, this.quantidadeItens);
  //     })
  //   });
  // }

}
