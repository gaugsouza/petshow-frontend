import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { Agendamento } from 'src/app/interfaces/agendamento';
import { AgendamentoService } from 'src/app/servicos/agendamento.service';
import { LocalStorageService } from 'src/app/servicos/local-storage.service';
import { USER_TOKEN } from 'src/app/util/constantes';
import { JwtHelper } from 'src/app/util/jwt-helper';

@Component({
  selector: 'app-visualizacao-agendamento',
  templateUrl: './visualizacao-agendamento.component.html',
  styleUrls: ['./visualizacao-agendamento.component.scss']
})
export class VisualizacaoAgendamentoComponent implements OnInit {
  idUsuario:number;
  idAgendamento:number;
  agendamento:Agendamento;

  constructor(private route:ActivatedRoute,
              private localStorageService:LocalStorageService,
              private agendamentoService:AgendamentoService,
              private helper:JwtHelper) { }

  ngOnInit(): void {
    this.idAgendamento = +this.route.snapshot.paramMap.get('idAgendamento');

    this.localStorageService.getItem(USER_TOKEN).subscribe((token:string) => {
      this.idUsuario = this.helper.recuperaIdToken(token);
      this.agendamentoService.buscarAgendamento(this.idAgendamento, this.idUsuario, token).subscribe(agendamento => {
        this.agendamento = agendamento;
        console.log(agendamento);
      })
    })

  }

  getPrecosPorTipo(agendamento:Agendamento) {
    const { animaisAtendidos, servicoDetalhado } = agendamento;

    return servicoDetalhado.precoPorTipo.filter(tipo => animaisAtendidos.filter(animal => animal.tipo.id === tipo.tipoAnimal.id).length > 0);
  }
}
