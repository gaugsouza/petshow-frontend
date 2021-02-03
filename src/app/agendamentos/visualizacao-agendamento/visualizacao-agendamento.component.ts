import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { Agendamento } from 'src/app/interfaces/agendamento';
import { Avaliacao } from 'src/app/interfaces/avaliacao';
import { AgendamentoService } from 'src/app/servicos/agendamento.service';
import { LocalStorageService } from 'src/app/servicos/local-storage.service';
import { STATUS_AGENDAMENTO, USER_TOKEN } from 'src/app/util/constantes';
import { JwtHelper } from 'src/app/util/jwt-helper';
import { UsuarioService } from 'src/app/servicos/usuario.service';
import { Usuario } from 'src/app/interfaces/usuario';
import { TipoPessoa } from 'src/app/enum/tipo-pessoa.enum';

@Component({
  selector: 'app-visualizacao-agendamento',
  templateUrl: './visualizacao-agendamento.component.html',
  styleUrls: ['./visualizacao-agendamento.component.scss']
})
export class VisualizacaoAgendamentoComponent implements OnInit {
  idUsuario:number;
  idAgendamento:number;
  agendamento:Agendamento;
  isFormVisible:boolean;
  redirectTo:string = '';
  isCliente:boolean = false;
  avaliacaoBase:Avaliacao = {
    atencao: 0,
    qualidadeProdutos: 0,
    custoBeneficio: 0,
    infraestrutura: 0,
    qualidadeServico: 0,
    comentario: null
  }

  avaliacao: Avaliacao;

  constructor(private route:ActivatedRoute,
              private localStorageService:LocalStorageService,
              private agendamentoService:AgendamentoService,
              private helper:JwtHelper,
              private clienteService:UsuarioService) { }

  ngOnInit(): void {
    this.idAgendamento = +this.route.snapshot.paramMap.get('idAgendamento');

    this.localStorageService.getItem(USER_TOKEN).subscribe((token:string) => {
      this.idUsuario = this.helper.recuperaIdToken(token);
      this.agendamentoService.buscarAgendamento(this.idAgendamento, this.idUsuario, token).subscribe(agendamento => {
        this.agendamento = agendamento;
      });

      this.clienteService.getUsuario(token).subscribe((usuario:Usuario) => {
        this.isCliente = (usuario || {}).tipo === TipoPessoa.CLIENTE || false;
      }, () => {
        this.isCliente = false;
      })
    });

    this.buscaAvaliacao(this.idAgendamento);
  }

  abreFormulario() {
    this.isFormVisible = !this.isFormVisible;
  }

  getPrecosPorTipo(agendamento:Agendamento) {
    const { animaisAtendidos, servicoDetalhado } = agendamento;

    return servicoDetalhado.precoPorTipo.filter(tipo => animaisAtendidos.filter(animal => animal.tipo.id === tipo.tipoAnimal.id).length > 0);
  }

  // TODO: Arrumar isso de acordo com o padrão de status agendamento
  isAgendamentoConcluido(agendamento:Agendamento) :boolean {
    return STATUS_AGENDAMENTO.concluido.includes(agendamento.status.nome.toUpperCase());
  }


  //TODO: Validar se agendamento possui avaliações relacionadas a ela
  isAgendamentoAvaliado():boolean {
    return !! this.avaliacao;
  }

  buscaAvaliacao(agendamentoId:number) {
    this.localStorageService.getItem(USER_TOKEN).subscribe((token:string) => {
      this.agendamentoService.buscarAvaliacaoPorAgendamento(agendamentoId, token).subscribe((avaliacao:Avaliacao) =>{
        this.avaliacao = avaliacao;
      })
    });
  }

  adicionaAvaliacao(avaliacao:Avaliacao) {
    this.avaliacao = {
      atencao: avaliacao.atencao,
      custoBeneficio: avaliacao.custoBeneficio,
      infraestrutura: avaliacao.infraestrutura,
      qualidadeProdutos: avaliacao.qualidadeProdutos,
      qualidadeServico: avaliacao.qualidadeServico,
      comentario: avaliacao.comentario,
      cliente: {id: this.idUsuario},
      servicoAvaliadoId: this.agendamento.servicoDetalhadoId
    }    

    this.localStorageService.getItem(USER_TOKEN).subscribe((token:string) => {
      this.agendamentoService.adicionarAvaliacao(this.idAgendamento, this.avaliacao, token).subscribe((avaliacao:Avaliacao) =>{
        this.avaliacao = avaliacao;
      })
    });
  }

  fechaFormulario() {
    this.isFormVisible = false;
  }
}
