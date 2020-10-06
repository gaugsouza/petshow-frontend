import { Component, Input, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { ServicosService } from '../servicos/servicos.service';
import { ServicoDetalhado } from 'src/app/interfaces/servico-detalhado';
@Component({
  selector: 'app-lista-servicos-detalhados',
  templateUrl: './lista-servicos-detalhados.component.html',
  styleUrls: ['./lista-servicos-detalhados.component.scss']
})
export class ListaServicosDetalhadosComponent implements OnInit {
  // @Input('servicos-detalhados') servicosDetalhados?: ServicoDetalhado[];
 
  constructor(private servicosService:ServicosService,
              private router:Router, 
              private tipoId:number,
              private servicoDetalhado:ServicoDetalhado) {}

  ngOnInit(): void {
    this.getTipo;
    this.buscarServicosDetalhadosPorTipo(this.tipoId);
  }
  
  getTipo() : void {
    this.servicosService.buscaTipoStorage()
    .subscribe((tipoId:number) => {
      this.tipoId = tipoId
    });
  }

  buscarServicosDetalhadosPorTipo(id:number) : void {
    this.servicosService.buscarServicosDetalhadosPorTipo(id)
    .subscribe((servicoDetalhado:ServicoDetalhado) => {
      this.servicoDetalhado = servicoDetalhado
    });
  }

}
