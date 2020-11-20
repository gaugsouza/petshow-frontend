import { Component, OnInit } from '@angular/core';
import { Prestador } from '../../interfaces/prestador';
import { PrestadorService } from '../../servicos/prestador.service';
import { ActivatedRoute } from '@angular/router';
import { ServicosService } from '../../servicos/servicos.service';
import { ServicoDetalhado } from 'src/app/interfaces/servico-detalhado';
import { LocalStorageService } from 'src/app/servicos/local-storage.service';
import { ObjetoPaginado } from 'src/app/interfaces/paginacao';


@Component({
  selector: 'app-prestador-detalhe',
  templateUrl: './prestador-detalhe.component.html',
  styleUrls: ['./prestador-detalhe.component.scss'],
})
export class PrestadorDetalheComponent implements OnInit {
  prestador:Prestador;
  prestadorId:number;
  servicosDetalhados:ServicoDetalhado[];



  constructor(private prestadorService:PrestadorService,
              private route: ActivatedRoute,
              private servicosService:ServicosService,
              private localStorageService: LocalStorageService) {}

  ngOnInit(): void {
    this.prestadorId=+this.route.snapshot.paramMap.get('id');
    this.buscarPrestadorPorId(this.prestadorId);

  }


  buscarPrestadorPorId(id:number) : void {
    this.prestadorService.buscarPrestadorPorId(id)
    .subscribe((prestador) => {
      this.prestador = JSON.parse(prestador);
    })
  }; 


  // buscarServicosDetalhadosPorPrestador(prestadorId:number, pagina:number, quantidadeItens:number){
  //   this.localStorageService.getItem(USER_TOKEN).subscribe((token : string) => {
  //     this.servicosService.buscarServicosDetalhadosPorPrestador(prestadorId, pagina, quantidadeItens, token)
  //       .subscribe(paginaServicosDetalhados => {
  //         let objetoPaginado:ObjetoPaginado = paginaServicosDetalhados;

  //         this.servicosDetalhados = objetoPaginado.content;

  //         this.quantidadeTotal = objetoPaginado.totalElements
  //         this.paginaAtual = objetoPaginado.pageable.pageNumber;
  //         this.quantidadeItens = objetoPaginado.size;
  //       });
  //   });
  // }


}
