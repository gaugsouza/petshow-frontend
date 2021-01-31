import { Component, Inject, Input, OnInit } from '@angular/core';
import { PageEvent } from '@angular/material/paginator';
import { LocalStorage } from '@ngx-pwa/local-storage';
import { Agendamento } from 'src/app/interfaces/agendamento';
import { AnimalEstimacao } from 'src/app/interfaces/animalEstimacao';
import { Cliente } from 'src/app/interfaces/cliente';
import { StatusAgendamento } from 'src/app/interfaces/statusAgendamento';
import { AgendamentoService } from 'src/app/servicos/agendamento.service';
import { LocalStorageService } from 'src/app/servicos/local-storage.service';
import { NotificationService } from 'src/app/servicos/notification.service';
import { USER_TOKEN } from 'src/app/util/constantes';

@Component({
  selector: 'app-agenda-cliente',
  templateUrl: './agenda-cliente.component.html',
  styleUrls: ['./agenda-cliente.component.scss']
})
export class AgendaClienteComponent implements OnInit {
  @Input('cliente-id') clienteId: number;
  agendamentos: Agendamento[];
  animaisAtendidos: AnimalEstimacao[];
  pageEvent: PageEvent;
  quantidadeTotal:number;
  quantidadeItens:number = 5;
  paginaAtual:number = 0;
  statusAgendamento: StatusAgendamento[];
  
  constructor(
    private agendamentoService:AgendamentoService,
    private localStorageService:LocalStorageService,
    @Inject('AgendamentoNotificationService') private agendamentoNotification: NotificationService<Agendamento>
  ) { }

  ngOnInit(): void {

    this.agendamentoNotification.notify({precoFinal:null, animaisAtendidos:[{nome:null, tipo:{id:null, nome:null}}], servicoDetalhadoId:null, clienteId:null, prestadorId:null});

    

  }

  
}
