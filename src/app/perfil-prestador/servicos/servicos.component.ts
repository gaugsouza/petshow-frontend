import { Component, OnInit,Input, Output, EventEmitter } from '@angular/core';
import { ServicoDetalhado } from 'src/app/interfaces/servico-detalhado';

@Component({
  selector: 'app-servicos',
  templateUrl: './servicos.component.html',
  styleUrls: ['./servicos.component.scss']
})
export class ServicosComponent implements OnInit {
  @Input('servicos-detalhados') servicosDetalhados?:ServicoDetalhado[];
  @Output('remover-servico') removerServico = new EventEmitter<ServicoDetalhado>();
  constructor() { }

  ngOnInit(): void {
  }

  removeServico(servico:ServicoDetalhado) {
    console.log(servico);
    this.removerServico.emit(servico);
  }


}
