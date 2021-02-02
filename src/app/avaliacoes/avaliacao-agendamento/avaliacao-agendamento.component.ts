import { Component, Input, OnInit } from '@angular/core';
import { Agendamento } from 'src/app/interfaces/agendamento';
import { Avaliacao } from 'src/app/interfaces/avaliacao';
import { AvaliacaoService } from 'src/app/servicos/avaliacao.service';

@Component({
  selector: 'app-avaliacao-agendamento',
  templateUrl: './avaliacao-agendamento.component.html',
  styleUrls: ['./avaliacao-agendamento.component.scss']
})
export class AvaliacaoAgendamentoComponent implements OnInit {
  @Input('avaliacao') avaliacao:Avaliacao;

  constructor(private avaliacaoService:AvaliacaoService) { }

  ngOnInit(): void {
  }

  getEstrelasAvaliacao(campo:string) {
    return this.avaliacaoService.getEstrelasAvaliacao(this.avaliacao, campo);
  }

  getCriterios() {
    return [
      {campo: 'atencao', valor: 'Atenção'}, 
      {campo: 'qualidadeProdutos', valor: 'Qualidade dos produtos'},
      {campo: 'custoBeneficio', valor: 'Custo benefício'},
      {campo: 'infraestrutura', valor: 'Infraestrutura'},
      {campo: 'qualidadeServico', valor: 'Qualidade servico'}];
  }



}
