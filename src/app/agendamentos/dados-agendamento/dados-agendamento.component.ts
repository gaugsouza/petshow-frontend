import {
  ChangeDetectorRef, Component, EventEmitter, Input, OnInit, Output,
} from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { Adicional } from 'src/app/interfaces/adicional';
import { AnimalEstimacao } from 'src/app/interfaces/animalEstimacao';
import { Cliente } from 'src/app/interfaces/cliente';
import { Negociacao } from 'src/app/interfaces/negociacao';
import { Prestador } from 'src/app/interfaces/prestador';
import { ServicoDetalhado } from 'src/app/interfaces/servico-detalhado';
import { ServicoDetalhadoTipoAnimal } from 'src/app/interfaces/servico-detalhado-tipo-animal';
import { ConfirmacaoCancelamentoComponent } from 'src/app/perfis/confirmacao-cancelamento/confirmacao-cancelamento.component';
import { LocalStorageService } from 'src/app/servicos/local-storage.service';
import { PrestadorService } from 'src/app/servicos/prestador.service';
import { UsuarioService } from 'src/app/servicos/usuario.service';
import { STATUS_AGENDAMENTO, USER_TOKEN } from 'src/app/util/constantes';

@Component({
  selector: 'app-dados-agendamento',
  templateUrl: './dados-agendamento.component.html',
  styleUrls: ['./dados-agendamento.component.scss'],
})
export class DadosAgendamentoComponent implements OnInit {
  @Input() idPrestador:number;

  @Input('animais') animaisEstimacao:AnimalEstimacao[];

  @Input() precoPorTipo:ServicoDetalhadoTipoAnimal[];

  @Input() isVisualizacao:boolean;

  @Input() adicionais:Adicional[];

  @Input() servicoDetalhado:ServicoDetalhado;

  @Input() idCliente:number;

  @Input() dataAgendamento:Date;

  @Input('status') status:string;

  @Input() negociacao:Negociacao;

  @Input() isCliente?:boolean = null;

  @Output() atualizaNegociacao?:EventEmitter<Negociacao> = new EventEmitter<Negociacao>();

  cliente:Cliente;

  prestador:Prestador;

  constructor(private prestadorService:PrestadorService,
              private clienteService:UsuarioService,
              private ref:ChangeDetectorRef,
              private dialog:MatDialog) { }

  ngOnInit(): void {
    this.prestadorService.buscaPrestador(this.idPrestador).subscribe((prestador) => {
      this.prestador = JSON.parse(prestador);
    });

    this.clienteService.buscarUsuario(this.idCliente).subscribe((cliente) => {
      this.cliente = JSON.parse(cliente);
    });
  }

  /* eslint-disable no-param-reassign */
  getValorLista = (precos) => precos.reduce((acc, el) => { acc += el; return acc; }, 0);
  /* eslint-enable no-param-reassign */

  getValorTotal() {
    const valorTipos = this.getValorLista((this.precoPorTipo || []).map((el) => el.preco));

    const valorAdicionais = this.getValorLista((this.adicionais || []).map((el) => el.preco));
    return valorTipos + valorAdicionais;
  }

  ngAfterContentChecked() {
    this.ref.detectChanges();
  }

  getStatusClassColor():string {
    if (STATUS_AGENDAMENTO.concluido.includes(this.status.toUpperCase())) {
      return 'concluido';
    }

    if (STATUS_AGENDAMENTO.cancelado.includes(this.status.toUpperCase())) {
      return 'cancelado';
    }

    return 'nao-realizado';
  }

  geraStatusOferta(status:boolean) {
    if(status === null) {
      return 'PENDENTE';
    }

    return status ? 'ACEITO' : 'NEGADO';
  }


  geraTitulo() {
    if (!this.prestador.empresa.id) {
      return this.prestador.nome;
    }

    return this.prestador.empresa.razaoSocial || this.prestador.empresa.nome;
  }

  clienteVisualizando() {
    if(this.isCliente === null) {
      return null;
    }

    return this.isCliente;
  }

  confirmarNegociacao(status:boolean) {
    const dialogRef = this.dialog.open(ConfirmacaoCancelamentoComponent, {
      width: '200px',
      data: 'CONFIRMAR_NEGOCIACAO'
    });

    dialogRef.afterClosed().subscribe(result => {
      console.log(result);
      if(result) {
        this.atualizaNegociacao.emit({...this.negociacao, respostaOferta: status});
      }
    });
  }
}
