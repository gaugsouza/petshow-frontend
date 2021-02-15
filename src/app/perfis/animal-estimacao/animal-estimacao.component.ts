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
import { MatDialog } from '@angular/material/dialog';
import { ConfirmacaoCancelamentoComponent } from '../confirmacao-cancelamento/confirmacao-cancelamento.component';

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

  constructor(private cancelamento: MatDialog,
              private usuarioService: UsuarioService,
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

  // removeAnimal(animalEstimacao:AnimalEstimacao) {
  //   this.removerAnimal.emit(animalEstimacao);
  // }

  removeAnimal(animalEstimacao:AnimalEstimacao) {
    const cancelRef = this.cancelamento.open(ConfirmacaoCancelamentoComponent,
      {
        data: "DESEJA_CONFIRMAR_REMOCAO_ANIMAL"
      });
    cancelRef.afterClosed().subscribe((result) => {
      if (result) {
        const cancelaId = this.removerAnimal.emit(animalEstimacao);
      }
    });
  }

  buscarAnimaisEstimacaoPorDono(donoId:number, pagina:number, quantidadeItens:number) {
    this.localStorageService.getItem(USER_TOKEN).subscribe((token : string) => {
      this.usuarioService.buscarAnimaisEstimacaoPorDono(donoId, pagina, quantidadeItens, token)
        .subscribe((paginaAnimaisEstimacao) => {
          const objetoPaginado:ObjetoPaginado = paginaAnimaisEstimacao;
          const {
            content, pageable, totalElements, size,
          } = objetoPaginado;
          this.animaisEstimacao = content;
          this.quantidadeTotal = totalElements || this.quantidadeTotal;
          this.paginaAtual = (pageable || {}).pageNumber || this.paginaAtual;
          this.quantidadeItens = size || this.quantidadeItens;
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
