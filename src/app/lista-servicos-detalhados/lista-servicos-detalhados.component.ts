import { Component, Input, OnInit, ViewChild } from '@angular/core';
import { Router } from '@angular/router';
import { ServicosService } from 'src/app/servicos/servicos.service';
import { ServicoDetalhado } from 'src/app/interfaces/servico-detalhado';
import {ActivatedRoute} from '@angular/router';
import { PrestadorService } from 'src/app/servicos/prestador.service';
import { PageEvent } from '@angular/material/paginator';
import { ObjetoPaginado } from 'src/app/interfaces/paginacao';

@Component({
  selector: 'app-lista-servicos-detalhados',
  templateUrl: './lista-servicos-detalhados.component.html',
  styleUrls: ['./lista-servicos-detalhados.component.scss']
})
export class ListaServicosDetalhadosComponent implements OnInit {
  servicosDetalhados:ServicoDetalhado[]
  tipoId:number

  pageEvent: PageEvent;
  quantidadeTotal:number;
  quantidadePagina:number = 6;
  paginaAtual:number = 0;
      
  constructor(private servicosService:ServicosService,
              private route: ActivatedRoute,
              private prestadorService: PrestadorService) {}

  ngOnInit(): void {
      this.tipoId =+ this.route.snapshot.paramMap.get('id');

      this.buscarServicosDetalhadosPorTipo(this.tipoId, this.paginaAtual, this.quantidadePagina);
  }

  eventoPagina(event: PageEvent){
    let pagina = event.pageIndex;
    let quantidadePagina = event.pageSize;
    
    this.buscarServicosDetalhadosPorTipo(this.tipoId, pagina, quantidadePagina);

    return event;
  }

  buscarServicosDetalhadosPorTipo(id:number, pagina?:number, quantidadeItens?:number) {
    this.servicosService.buscarServicosDetalhadosPorTipo(id, pagina, quantidadeItens)
      .subscribe(paginaServicosDetalhados => {
        let objetoPaginado:ObjetoPaginado = JSON.parse(paginaServicosDetalhados);
        let servicos = objetoPaginado.content;

        servicos.forEach(servico => {
          this.prestadorService.buscaPrestador(servico.prestadorId).subscribe(prestador => {
            servico.prestador = JSON.parse(prestador);
          })
        });
        
        this.servicosDetalhados = servicos;
        this.quantidadeTotal = objetoPaginado.totalElements
        this.paginaAtual = objetoPaginado.pageable.pageNumber;
        this.quantidadePagina = objetoPaginado.size;
      });
  }
}
