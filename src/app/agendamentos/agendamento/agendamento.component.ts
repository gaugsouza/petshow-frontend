import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { LocalStorageService } from 'src/app/servicos/local-storage.service';
import { AgendamentoService } from 'src/app/servicos/agendamento.service';
import { JwtHelper } from 'src/app/util/jwt-helper';
import { USER_TOKEN } from 'src/app/util/constantes';
import { Agendamento } from 'src/app/interfaces/agendamento';
import { AnimalEstimacao } from 'src/app/interfaces/animalEstimacao';
import { Cliente } from 'src/app/interfaces/cliente';
import { ServicoDetalhado } from 'src/app/interfaces/servico-detalhado';

@Component({
  selector: 'app-agendamento',
  templateUrl: './agendamento.component.html',
  styleUrls: ['./agendamento.component.scss']
})
export class AgendamentoComponent implements OnInit {
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

  constructor(private route:ActivatedRoute,
    private localStorageService:LocalStorageService,
    private agendamentoService: AgendamentoService,
    private jwtHelper: JwtHelper) { 
      this.isVisualizacao = this.route.snapshot.params.isVisualizacao;
    }

  ngOnInit(): void {
    this.idPrestador =+ this.route.snapshot.paramMap.get('prestadorId');
    this.idServico =+ this.route.snapshot.paramMap.get('servicoDetalhadoId');
    this.idAgendamento =+ this.route.snapshot.paramMap.get('agendamentoId');

    this.localStorageService.getItem(USER_TOKEN).subscribe((token:string) => {
      if (!token) {
        return;
      }

      this.idCliente = this.jwtHelper.recuperaIdToken(token);
    });
  }

  recuperaAnimaisEstimacaoSelecionados(animaisEstimacao){
    this.animaisEstimacao = animaisEstimacao;
  }

  adicionarAgendamento(){
    this.agendamento = {
      clienteId: this.idCliente,
      prestadorId: this.idPrestador,
      comentario: this.comentario,
      animaisAtendidos: this.animaisEstimacao,
      precoFinal: this.precoFinal,
      servicoDetalhadoId: this.idServico      
    };
    
    this.localStorageService.getItem(USER_TOKEN).subscribe((token:string) => {
      this.agendamentoService.adicionarAgendamento(this.agendamento, token).subscribe(agendamento => {
        console.log(agendamento)
      });
      
    });    
  }
}
