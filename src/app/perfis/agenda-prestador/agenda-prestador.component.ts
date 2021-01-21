import { Component, Inject, Input, OnInit } from '@angular/core';
import { PageEvent } from '@angular/material/paginator';
import { Agendamento } from 'src/app/interfaces/agendamento';
import { AnimalEstimacao } from 'src/app/interfaces/animalEstimacao';
import { ObjetoPaginado } from 'src/app/interfaces/paginacao';
import {AgendamentoService} from 'src/app/servicos/agendamento.service';
import { LocalStorageService } from 'src/app/servicos/local-storage.service';
import { NotificationService } from 'src/app/servicos/notification.service';
import { USER_TOKEN } from 'src/app/util/constantes';

@Component({
  selector: 'app-agenda-prestador',
  templateUrl: './agenda-prestador.component.html',
  styleUrls: ['./agenda-prestador.component.scss']
})
export class AgendaPrestadorComponent implements OnInit {
  @Input('prestador-id') prestadorId: number;
  agendamentos: Agendamento[];
  animaisAtendidos: AnimalEstimacao[];
  pageEvent: PageEvent;
  quantidadeTotal:number;
  quantidadeItens:number = 5;
  paginaAtual:number = 0;
  
  constructor(private agendamentoService:AgendamentoService,
    private localStorageService:LocalStorageService,
    @Inject('AgendamentoNotificationService') private agendamentoNotification: NotificationService<Agendamento>
    ) { }

  ngOnInit(): void {

    this.agendamentoNotification.notify({precoFinal:null, animaisAtendidos:[{nome:null, tipo:{id:null, nome:null}}], servicoDetalhadoId:null,clienteId:null,prestadorId:null});
    
    this.agendamentoNotification.obs.subscribe(() => {
      this.buscarAgendamentosPorPrestador(this.prestadorId, this.paginaAtual, this.quantidadeItens);
    });
  }

    buscarAgendamentosPorPrestador(prestadorId:number, pagina:number, quantidadeItens:number) {
      this.localStorageService.getItem(USER_TOKEN).subscribe((token : string) => {
        this.agendamentoService.buscarAgendamentosPorPrestador(prestadorId, pagina,
          quantidadeItens, token)
          .subscribe((paginaAgendamentos) => {
            const objetoPaginado:ObjetoPaginado = paginaAgendamentos;
            console.log(objetoPaginado.content);
            this.agendamentos = objetoPaginado.content;
            this.quantidadeTotal = objetoPaginado.totalElements;
            this.paginaAtual = objetoPaginado.pageable.pageNumber;
            this.quantidadeItens = objetoPaginado.size;
          });
      });
    }

    // this.agendamentoService.buscarAgendamentosPorPrestador(this.prestadorId, 5,5,USER_TOKEN).subscribe((el)=>{
    //   this.agendamentos=JSON.parse(el);
    //   })
    // };
  
  }
