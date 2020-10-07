import { Component, Input, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { ServicosService } from '../servicos/servicos.service';
import { ServicoDetalhado } from 'src/app/interfaces/servico-detalhado';
import {ActivatedRoute} from '@angular/router';
@Component({
  selector: 'app-lista-servicos-detalhados',
  templateUrl: './lista-servicos-detalhados.component.html',
  styleUrls: ['./lista-servicos-detalhados.component.scss']
})
export class ListaServicosDetalhadosComponent implements OnInit {
  // @Input('servicos-detalhados') servicosDetalhados?: ServicoDetalhado[];
   tipoId:number
   servicosDetalhados:ServicoDetalhado[]

  constructor(private servicosService:ServicosService,
              //private router:Router, 
              private route: ActivatedRoute) {}

  ngOnInit(): void {
      this.tipoId=+this.route.snapshot.paramMap.get('id');
      this.buscarServicosDetalhadosPorTipo(this.tipoId);
  }
  
  buscarServicosDetalhadosPorTipo(id:number) : void {
    this.servicosService.buscarServicosDetalhadosPorTipo(id)
    .subscribe((servicosDetalhados) => {
      this.servicosDetalhados = servicosDetalhados
    });
  }

}
