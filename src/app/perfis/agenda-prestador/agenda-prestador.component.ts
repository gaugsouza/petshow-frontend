import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { Agendamento } from 'src/app/interfaces/agendamento';
import {AgendamentoService} from 'src/app/servicos/agendamento.service';
import { LocalStorageService } from 'src/app/servicos/local-storage.service';
import { USER_TOKEN } from 'src/app/util/constantes';

@Component({
  selector: 'app-agenda-prestador',
  templateUrl: './agenda-prestador.component.html',
  styleUrls: ['./agenda-prestador.component.scss']
})
export class AgendaPrestadorComponent implements OnInit {
  idPrestador: number;
  agendamentos: Agendamento[];
  
  constructor(private agendamentoService:AgendamentoService,
    private localStorageService:LocalStorageService,
    private route:ActivatedRoute
    ) { 

    }

  ngOnInit(): void {
    this.idPrestador =+ this.route.snapshot.paramMap.get('prestadorId');
    this.localStorageService.getItem(USER_TOKEN).subscribe((token:string) => {
    if (!token) {
      return;
      }
    });
    this.agendamentoService.buscarAgendamentosPorPrestador(this.idPrestador, 5,5,USER_TOKEN).subscribe((el)=>{
      this.agendamentos=JSON.parse(el);
      })
    };
  
  }


  // ngOnInit(): void {
  //   this.servicoNotification.notify({});
  //   this.servicoNotification.obs.subscribe(() => {
  //     this.buscarServicosDetalhadosPorPrestador(this.prestadorId, this.paginaAtual,
  //       this.quantidadeItens);
  //   });
  // }

