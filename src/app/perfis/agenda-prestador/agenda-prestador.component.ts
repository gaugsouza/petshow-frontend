import { Component, Inject, Input, OnInit } from '@angular/core';
import { PageEvent } from '@angular/material/paginator';
import { Agendamento } from 'src/app/interfaces/agendamento';
import { AnimalEstimacao } from 'src/app/interfaces/animalEstimacao';
import { ObjetoPaginado } from 'src/app/interfaces/paginacao';
import { StatusAgendamento } from 'src/app/interfaces/statusAgendamento';
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
  statusAgendamento: StatusAgendamento[];
  
  constructor(
    private agendamentoService:AgendamentoService,
    private localStorageService:LocalStorageService,
    @Inject('AgendamentoNotificationService') private agendamentoNotification: NotificationService<Agendamento>
    ) { }

  ngOnInit(): void {

    this.agendamentoNotification.notify({precoFinal:null, animaisAtendidos:[{nome:null, tipo:{id:null, nome:null}}], servicoDetalhadoId:null,clienteId:null,prestadorId:null});
    
    this.agendamentoNotification.obs.subscribe(() => {
      this.buscarAgendamentosPorPrestador(this.prestadorId, this.paginaAtual, this.quantidadeItens);
    });

    this.localStorageService.getItem(USER_TOKEN).subscribe((token : string) => {
      this.agendamentoService.buscarStatusAgendamento(token).subscribe(status => {
        this.statusAgendamento = status;
        console.log(status)
        console.log(this.statusAgendamento)
      });
    })
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

    concluiAgendamento(agendamento){
      const concluidoId = this.statusAgendamento.find(status => status.nome.toLowerCase().indexOf("concluído")!==-1)
      this.localStorageService.getItem(USER_TOKEN).subscribe((token : string) => {
        this.agendamentoService.alterarStatusAgendamento(agendamento.prestadorId, concluidoId.id, agendamento.id, token)
        .subscribe(() => {
          this.buscarAgendamentosPorPrestador(this.prestadorId, this.paginaAtual, this.quantidadeItens);
        })
      });
    }

    cancelaAgendamento(agendamento){
      const cancelaId = this.statusAgendamento.find(status => status.nome.toLowerCase().indexOf("cancelado")!==-1)
      this.localStorageService.getItem(USER_TOKEN).subscribe((token : string) => {
        this.agendamentoService.alterarStatusAgendamento(agendamento.prestadorId, cancelaId.id, agendamento.id, token)
        .subscribe(() => {
          this.buscarAgendamentosPorPrestador(this.prestadorId, this.paginaAtual, this.quantidadeItens);
        })
      });
    }


    isAtivo(agendamento){
      return agendamento.status.nome.toLowerCase().indexOf("cancelado")===-1 &&  agendamento.status.nome.toLowerCase().indexOf("concluído")===-1;
    }
  
  }
