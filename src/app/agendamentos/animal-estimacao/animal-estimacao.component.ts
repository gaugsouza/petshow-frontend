import { Component, OnInit, Input } from '@angular/core';
import { UsuarioService } from 'src/app/servicos/usuario.service';
import { LocalStorageService } from 'src/app/servicos/local-storage.service';
import { USER_TOKEN } from 'src/app/util/constantes';
import { ObjetoPaginado } from 'src/app/interfaces/paginacao';
import { AnimalEstimacao } from 'src/app/interfaces/animalEstimacao';
import { PageEvent } from '@angular/material/paginator';

@Component({
  selector: 'app-animal-estimacao',
  templateUrl: './animal-estimacao.component.html',
  styleUrls: ['./animal-estimacao.component.scss']
})
export class AnimalEstimacaoComponent implements OnInit {
  @Input() isVisualizacao: Boolean;
  @Input() idCliente: number;

  animaisEstimacao: AnimalEstimacao[];
  pageEvent: PageEvent;
  quantidadeTotal:number;
  quantidadeItens:number = 5;
  paginaAtual:number = 0;
  
  constructor(private usuarioService: UsuarioService,
              private localStorageService: LocalStorageService) { }

  ngOnInit() {
    if(this.idCliente){
      this.buscarAnimaisEstimacaoPorDono(this.idCliente, this.paginaAtual, this.quantidadeItens);
    }    
  }

  buscarAnimaisEstimacaoPorDono(donoId:number, pagina:number, quantidadeItens:number) {
    this.localStorageService.getItem(USER_TOKEN).subscribe((token : string) => {
      this.usuarioService.buscarAnimaisEstimacaoPorDono(donoId, pagina, quantidadeItens, token)
        .subscribe((paginaAnimaisEstimacao) => {
          const objetoPaginado: ObjetoPaginado = paginaAnimaisEstimacao;
          this.animaisEstimacao = objetoPaginado.content;
          this.quantidadeTotal = objetoPaginado.totalElements;
          this.paginaAtual = objetoPaginado.pageable.pageNumber;
          this.quantidadeItens = objetoPaginado.size;
        });
    });
  }

  eventoPagina(event: PageEvent) {
    const pagina = event.pageIndex;
    const quantidadeItens = event.pageSize;
    this.buscarAnimaisEstimacaoPorDono(this.idCliente, pagina, quantidadeItens);
    return event;
  }
}
