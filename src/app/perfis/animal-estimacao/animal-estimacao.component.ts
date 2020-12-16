import {
  Component, OnInit, Input, Output, EventEmitter, Inject,
} from '@angular/core';
import { AnimalEstimacao } from 'src/app/interfaces/animalEstimacao';
import { UsuarioService } from 'src/app/servicos/usuario.service';
import { LocalStorageService } from 'src/app/servicos/local-storage.service';
import { USER_TOKEN } from 'src/app/util/constantes';
import { ObjetoPaginado } from 'src/app/interfaces/paginacao';
import { PageEvent } from '@angular/material/paginator';
import { NotificationService } from 'src/app/servicos/notification.service';

@Component({
  selector: 'app-animal-estimacao',
  templateUrl: './animal-estimacao.component.html',
  styleUrls: ['./animal-estimacao.component.scss'],
})
export class AnimalEstimacaoComponent implements OnInit {
  @Input('dono-id') donoId: number;

  @Output('remover-animal') removerAnimal = new EventEmitter<AnimalEstimacao>();

  @Output('seleciona-animal') animalEmitter = new EventEmitter<AnimalEstimacao>();

  animaisEstimacao: AnimalEstimacao[];

  pageEvent: PageEvent;

  quantidadeTotal:number;

  quantidadeItens:number = 5;

  paginaAtual:number = 0;

  constructor(private usuarioService: UsuarioService,
              private localStorageService: LocalStorageService,
              @Inject('AnimalNotificationService') private animalNotification: NotificationService<AnimalEstimacao>) { }

  ngOnInit(): void {
    this.animalNotification.notify({ nome: null, tipo: null });
    this.animalNotification.obs.subscribe(() => {
      this.buscarAnimaisEstimacaoPorDono(this.donoId, this.paginaAtual, this.quantidadeItens);
    });
  }

  selecionaAnimal(animalEstimacao:AnimalEstimacao) {
    this.animalEmitter.emit(animalEstimacao);
  }

  removeAnimal(animalEstimacao:AnimalEstimacao) {
    this.removerAnimal.emit(animalEstimacao);
  }

  buscarAnimaisEstimacaoPorDono(donoId:number, pagina:number, quantidadeItens:number) {
    this.localStorageService.getItem(USER_TOKEN).subscribe((token : string) => {
      this.usuarioService.buscarAnimaisEstimacaoPorDono(donoId, pagina, quantidadeItens, token)
        .subscribe((paginaAnimaisEstimacao) => {
          const objetoPaginado:ObjetoPaginado = paginaAnimaisEstimacao;
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
    this.buscarAnimaisEstimacaoPorDono(this.donoId, pagina, quantidadeItens);
    return event;
  }
}
