import { Component, OnInit, Input, Output, EventEmitter } from '@angular/core';
import { UsuarioService } from 'src/app/servicos/usuario.service';
import { LocalStorageService } from 'src/app/servicos/local-storage.service';
import { USER_TOKEN } from 'src/app/util/constantes';
import { ObjetoPaginado } from 'src/app/interfaces/paginacao';
import { AnimalEstimacao } from 'src/app/interfaces/animalEstimacao';
import { PageEvent } from '@angular/material/paginator';
import { MatCheckboxChange } from '@angular/material/checkbox';

@Component({
  selector: 'app-animal-estimacao',
  templateUrl: './animal-estimacao.component.html',
  styleUrls: ['./animal-estimacao.component.scss']
})
export class AnimalEstimacaoComponent implements OnInit {
  @Input() isVisualizacao: Boolean;
  @Input() idCliente: number;
  @Output('recupera-animais-estimacao') recuperaAnimaisEstimacao = new EventEmitter<AnimalEstimacao[]>();

  pageEvent: PageEvent;
  quantidadeTotal:number;
  quantidadeItens:number = 5;
  paginaAtual:number = 0;
  animaisEstimacao: AnimalEstimacao[];
  
  constructor(private usuarioService: UsuarioService,
              private localStorageService: LocalStorageService) { }

  ngOnInit() {
    if(this.idCliente){
      if(this.isVisualizacao){
        this.buscarAnimaisEstimacaoPorDonoPaginados(this.idCliente, this.paginaAtual, this.quantidadeItens);
      } else {
        this.buscarAnimaisEstimacaoPorDono(this.idCliente);
      }      
    }    
  }

  buscarAnimaisEstimacaoPorDonoPaginados(donoId:number, pagina:number, quantidadeItens:number) {
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

  buscarAnimaisEstimacaoPorDono(donoId:number) {
    this.localStorageService.getItem(USER_TOKEN).subscribe((token : string) => {
      this.usuarioService.buscarAnimaisEstimacaoPorDono(donoId, 0, 1000, token)
        .subscribe((paginaAnimaisEstimacao) => {
          const objetoPaginado: ObjetoPaginado = paginaAnimaisEstimacao;
          this.animaisEstimacao = objetoPaginado.content;
        });
    });
  }

  eventoPagina(event: PageEvent) {
    const pagina = event.pageIndex;
    const quantidadeItens = event.pageSize;
    this.buscarAnimaisEstimacaoPorDonoPaginados(this.idCliente, pagina, quantidadeItens);
    return event;
  }

  selecionaAnimal(){
    let animaisSelecionados:AnimalEstimacao[] = [];

    let promise = new Promise((resolve, reject) => {      
      this.animaisEstimacao.forEach(animalEstimacao => {
        if(animalEstimacao.checked) {
          animaisSelecionados.push(animalEstimacao);
          resolve();
        } else {
          reject();
        }});
    });
  
    promise.then(() => {
      this.recuperaAnimaisEstimacao.emit(animaisSelecionados);
    });    
  }
}
