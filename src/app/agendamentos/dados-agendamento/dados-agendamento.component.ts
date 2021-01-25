import { Component, Input, OnInit } from '@angular/core';
import { Adicional } from 'src/app/interfaces/adicional';
import { AnimalEstimacao } from 'src/app/interfaces/animalEstimacao';
import { Cliente } from 'src/app/interfaces/cliente';
import { Prestador } from 'src/app/interfaces/prestador';
import { ServicoDetalhado } from 'src/app/interfaces/servico-detalhado';
import { ServicoDetalhadoTipoAnimal } from 'src/app/interfaces/servico-detalhado-tipo-animal';
import { PrestadorService } from 'src/app/servicos/prestador.service';

@Component({
  selector: 'app-dados-agendamento',
  templateUrl: './dados-agendamento.component.html',
  styleUrls: ['./dados-agendamento.component.scss']
})
export class DadosAgendamentoComponent implements OnInit {
  @Input() idPrestador:number;
  @Input('animais') animaisEstimacao:AnimalEstimacao[];
  @Input() precoPorTipo:ServicoDetalhadoTipoAnimal[];
  @Input() isVisualizacao:boolean;
  @Input() adicionais:Adicional[];
  @Input() servicoDetalhado:ServicoDetalhado;
  @Input() cliente:Cliente;

  prestador:Prestador;


  constructor(private prestadorService:PrestadorService) { }

  ngOnInit(): void {
    this.prestadorService.buscaPrestador(this.idPrestador).subscribe(prestador => {
      this.prestador = JSON.parse(prestador);
    });
  }

  getValorLista(precos) {
    return (precos).reduce((acc, el) => acc += el, 0);
  }

  getValorTotal() {
    const valorTipos = this.getValorLista((this.precoPorTipo || []).map(el => el.preco));

    const valorAdicionais = this.getValorLista((this.adicionais || []).map(el => el.preco));
    return valorTipos + valorAdicionais;
    
  }
}
