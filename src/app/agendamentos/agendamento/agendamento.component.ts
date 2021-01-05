import { Component, OnInit } from '@angular/core';
import { Cliente } from 'src/app/interfaces/cliente';
import { ServicoDetalhado } from 'src/app/interfaces/servico-detalhado';
import { ActivatedRoute, Router, Params } from '@angular/router';
import { LocalStorageService } from 'src/app/servicos/local-storage.service';
import { AvaliacaoService } from 'src/app/servicos/avaliacao.service';
import { PrestadorService } from 'src/app/servicos/prestador.service';
import { UsuarioService } from 'src/app/servicos/usuario.service';
import { JwtHelper } from 'src/app/util/jwt-helper';
import { USER_TOKEN } from 'src/app/util/constantes';

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
  isVisualizacao: boolean = true;

  constructor(private route:ActivatedRoute,
    private localStorageService:LocalStorageService,
    private jwtHelper: JwtHelper) { }

  ngOnInit(): void {
    this.idPrestador =+ this.route.snapshot.paramMap.get('prestadorId');
    this.idServico =+ this.route.snapshot.paramMap.get('servicoDetalhadoId');
    this.idAgendamento =+ this.route.snapshot.paramMap.get('agendamentoId');

    console.log(this.idAgendamento)

    this.localStorageService.getItem(USER_TOKEN).subscribe((token:string) => {
      if (!token) {
        return;
      }

      this.idCliente = this.jwtHelper.recuperaIdToken(token);
    });
  }
}
