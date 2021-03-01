import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { LocalStorageService } from 'src/app/servicos/local-storage.service';
import { AgendamentoService } from 'src/app/servicos/agendamento.service';
import { JwtHelper } from 'src/app/util/jwt-helper';
import { USER_TOKEN } from 'src/app/util/constantes';
import { Agendamento } from 'src/app/interfaces/agendamento';
import { AnimalEstimacao } from 'src/app/interfaces/animalEstimacao';
import { Cliente } from 'src/app/interfaces/cliente';
import { ServicoDetalhado } from 'src/app/interfaces/servico-detalhado';
import { Location, DatePipe } from '@angular/common';
import { ServicosService } from 'src/app/servicos/servicos.service';
import { ServicoDetalhadoTipoAnimal } from 'src/app/interfaces/servico-detalhado-tipo-animal';
import { Adicional } from 'src/app/interfaces/adicional';
import { PagamentoService } from 'src/app/servicos/pagamento.service'
import { ConfirmationDialogComponent } from 'src/app/perfis/confirmation-dialog/confirmation-dialog.component';
import { MatDialog } from '@angular/material/dialog';
import { MatStepper } from '@angular/material/stepper';
import { ErrorDialogComponent } from 'src/app/confirmation-dialog/error-dialog.component';
import { MERCADO_PAGO_URL } from 'src/app/util/url';

@Component({
  selector: 'app-agendamento',
  templateUrl: './agendamento.component.html',
  styleUrls: ['./agendamento.component.scss'],
})
export class AgendamentoComponent implements OnInit {
  token:string;

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

  servicoSelecionado:ServicoDetalhado;

  precoPorTipo:ServicoDetalhadoTipoAnimal[];

  adicionais:Adicional[];

  dataAgendamento:Date;

  erroAgendamento:string;

  constructor(private route:ActivatedRoute,
    private localStorageService:LocalStorageService,
    private agendamentoService: AgendamentoService,
    private router:Router,
    private location: Location,
    private jwtHelper: JwtHelper,
    private servicoService:ServicosService,
    private datePipe: DatePipe,
    private pagamentoService: PagamentoService,
    private dialog:MatDialog) {}

  ngOnInit(): void {
    this.localStorageService.getItem(USER_TOKEN).subscribe((token:string) => {
      if (!token) {
        this.router.navigate(['/login'], { queryParams: { redirectTo: this.location.path().split('?')[0] } });
        return;
      }
      this.token = token;
      this.idCliente = this.jwtHelper.recuperaIdToken(this.token);
    });

    this.route.queryParams.subscribe((params) => {
      this.isVisualizacao = JSON.parse(params.isVisualizacao) || false;
      this.idAgendamento = this.isVisualizacao ? +this.route.snapshot.paramMap.get('agendamentoId') : null;
    });

    this.idPrestador = +this.route.snapshot.paramMap.get('prestadorId');
    this.idServico = +this.route.snapshot.paramMap.get('servicoDetalhadoId');

    this.servicoService.buscarPorPrestadorIdEServicoId(this.idPrestador, this.idServico)
      .subscribe((servico) => {
        this.servicoSelecionado = JSON.parse(servico);
      });
    
   
  }

  recuperaAnimaisEstimacaoSelecionados(animaisEstimacao) {
    this.animaisEstimacao = animaisEstimacao;
  }

  recuperaPrecoPorTipo(precoPorTipo) {
    this.precoPorTipo = precoPorTipo;
  }

  recuperaAdicionais(adicionais) {
    this.adicionais = adicionais;
  }

  criarAgendamento() {
    this.agendamento = {
      clienteId: this.idCliente,
      prestadorId: this.idPrestador,
      servicoDetalhadoId: this.servicoSelecionado.id,
      animaisAtendidosIds: [...(this.animaisEstimacao || []).map((el) => el.id)],
      adicionaisIds: [...(this.adicionais || []).map((el) => el.id)],
      data: this.datePipe.transform(this.dataAgendamento, 'dd/MM/yyyy HH:mm'),
    };

    this.localStorageService.getItem(USER_TOKEN).subscribe((token:string) => {
      this.agendamentoService.adicionarAgendamento(this.agendamento, token)
        .subscribe((agendamento:Agendamento) => {
          this.idAgendamento = agendamento.id;
          this.geraPreference(agendamento.id);
        }, ({ error }) => {
          this.openErrorDialog(error);
          this.erroAgendamento = error;
        });
    });
  }

  recuperaDataAtendimento(data:Date) {
    this.dataAgendamento = data;
  }
  
  geraPreference(agendamentoId){    
    this.pagamentoService.recuperaPreference(agendamentoId, this.idCliente, this.token).subscribe(response => {
      let script = document.createElement("script");
  
      script.src = MERCADO_PAGO_URL;
      script.type = "text/javascript";
      script.dataset.preferenceId = response.preferenceId;
      script.dataset.buttonLabel= "Efetuar Pagamento";
      script.onclick = this.getValorTotal();
      
      document.getElementById("button-checkout").innerHTML = "";
      document.querySelector("#button-checkout").appendChild(script); 
    })
  }

  getValorLista = (precos) => precos.reduce((acc, el) => { acc += el; return acc; }, 0);

  getValorTotal() {
    const valorTipos = this.getValorLista((this.precoPorTipo || []).map((el) => el.preco));

    const valorAdicionais = this.getValorLista((this.adicionais || []).map((el) => el.preco));
    return valorTipos + valorAdicionais;
  }

  openConfirmationAgendar(stepper: MatStepper) {
    const data = {
      mensagem: 'PROSSEGUIR_AGENDAMENTO',
      response: true,
    };

    const dialogRef = this.dialog.open(ConfirmationDialogComponent, {
      width: '400px',
      data: { ...data },
    });

    dialogRef.afterClosed().subscribe((data) => {
      if (data) {
        if (data.response) {
          this.criarAgendamento();
          
          stepper.next();          
        }
      }
    });
  }

  openErrorDialog(erro){
    const data = {
      mensagem: typeof erro === 'string' ? erro : 'ERRO_REQUISICAO',
      textoBotao: 'Ok',
    };

    const dialogRef = this.dialog.open(ErrorDialogComponent, {
      width: '400px',
      data: { ...data },
    });

    dialogRef.backdropClick().subscribe(() => {
      this.router.navigate([`prestador/${this.idPrestador}/servicoDetalhado/${this.idServico}/agendamento?isVisualizacao=false`]);
    });
  }

  cancelarAgendamento(stepper: MatStepper){
    this.agendamentoService.deletarAgendamento(this.idAgendamento, this.idCliente, this.token).subscribe(() => {
      this.idAgendamento = undefined;
      document.getElementById("button-checkout").innerHTML = "";
      stepper.reset();      
    });
  }
}