import {
  ChangeDetectorRef, Component, Input, OnInit,
} from '@angular/core';
import { Adicional } from 'src/app/interfaces/adicional';
import { AnimalEstimacao } from 'src/app/interfaces/animalEstimacao';
import { Cliente } from 'src/app/interfaces/cliente';
import { Prestador } from 'src/app/interfaces/prestador';
import { ServicoDetalhado } from 'src/app/interfaces/servico-detalhado';
import { ServicoDetalhadoTipoAnimal } from 'src/app/interfaces/servico-detalhado-tipo-animal';
import { PrestadorService } from 'src/app/servicos/prestador.service';
import { UsuarioService } from 'src/app/servicos/usuario.service';
import { STATUS_AGENDAMENTO } from 'src/app/util/constantes';

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

  cliente:Cliente;

  prestador:Prestador;

  constructor(private prestadorService:PrestadorService,
              private clienteService:UsuarioService,
              private ref:ChangeDetectorRef) { }

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

  geraTitulo() {
    if (!this.prestador.empresa.id) {
      return this.prestador.nome;
    }

    return this.prestador.empresa.razaoSocial || this.prestador.empresa.nome;
  }
}
