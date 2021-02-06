import {
  Component, OnInit, Input, Output, EventEmitter, Inject,
} from '@angular/core';
import { ServicoDetalhado } from 'src/app/interfaces/servico-detalhado';
import { PageEvent } from '@angular/material/paginator';
import { ServicosService } from 'src/app/servicos/servicos.service';
import { LocalStorageService } from 'src/app/servicos/local-storage.service';
import { USER_TOKEN } from 'src/app/util/constantes';
import { ObjetoPaginado } from 'src/app/interfaces/paginacao';
import { NotificationService } from 'src/app/servicos/notification.service';
import { MatDialog } from '@angular/material/dialog';
import { JwtHelper } from 'src/app/util/jwt-helper';
import { Adicional } from 'src/app/interfaces/adicional';
import { AdicionalDialogComponent } from '../adicional-dialog/adicional-dialog.component';
import { ConfirmationDialogComponent } from '../confirmation-dialog/confirmation-dialog.component';

@Component({
  selector: 'app-servicos',
  templateUrl: './servicos.component.html',
  styleUrls: ['./servicos.component.scss'],
})
export class ServicosComponent implements OnInit {
  @Input('prestador-id') prestadorId: number;

  @Output('remover-servico') removerServico = new EventEmitter<ServicoDetalhado>();

  servicosDetalhados: ServicoDetalhado[];

  pageEvent: PageEvent;

  quantidadeTotal:number;

  quantidadeItens:number = 5;

  paginaAtual:number = 0;

  constructor(private servicosService: ServicosService,
              private localStorageService: LocalStorageService,
              @Inject('ServicoNotificationService') private servicoNotification: NotificationService<ServicoDetalhado>,
              public dialog:MatDialog,
              public jwtHelper:JwtHelper) { }

  ngOnInit(): void {
    this.servicoNotification.notify({});
    this.servicoNotification.obs.subscribe(() => {
      this.buscarServicosDetalhadosPorPrestador(this.prestadorId, this.paginaAtual,
        this.quantidadeItens);
    });
  }

  removeServico(servico:ServicoDetalhado) {
    this.removerServico.emit(servico);
  }

  buscarServicosDetalhadosPorPrestador(prestadorId:number, pagina:number, quantidadeItens:number) {
    this.localStorageService.getItem(USER_TOKEN).subscribe((token : string) => {
      this.servicosService.buscarServicosDetalhadosPorPrestador(prestadorId, pagina,
        quantidadeItens, token)
        .subscribe((paginaServicosDetalhados) => {
          const objetoPaginado:ObjetoPaginado = paginaServicosDetalhados;
          const {
            content, totalElements, pageable, size,
          } = objetoPaginado || {};
          this.servicosDetalhados = content;
          this.quantidadeTotal = totalElements || this.quantidadeTotal;
          this.paginaAtual = (pageable || {}).pageNumber || this.paginaAtual;
          this.quantidadeItens = size || this.quantidadeItens;
        });
    });
  }

  eventoPagina(event: PageEvent) {
    const pagina = event.pageIndex;
    const quantidadeItens = event.pageSize;
    this.buscarServicosDetalhadosPorPrestador(this.prestadorId, pagina, quantidadeItens);
    return event;
  }

  openDialogAtualizacao(adicional) {
    const data = {
      titulo: 'ALTERAR_ADICIONAL',
      textoBotao: 'ALTERAR',
      adicional,
    };

    const dialogRef = this.dialog.open(AdicionalDialogComponent, {
      width: '600px',
      data: { ...data },
    });

    dialogRef.afterClosed().subscribe((el:Adicional) => {
      if (el) {
        this.localStorageService.getItem(USER_TOKEN).subscribe((token : string) => {
          const prestadorId = this.jwtHelper.recuperaIdToken(token);

          this.servicosService.atualizarAdicional(prestadorId, el.servicoDetalhadoId,
            el.id, el, token)
            .subscribe(() => {
              this.buscarServicosDetalhadosPorPrestador(this.prestadorId, this.paginaAtual,
                this.quantidadeItens);
            });
        });
      }
    });
  }

  openConfirmationDialog(adicional) {
    const data = {
      mensagem: 'Deseja prosseguir com a deleção deste adicional?',
      response: true,
    };

    const dialogRef = this.dialog.open(ConfirmationDialogComponent, {
      width: '400px',
      data: { ...data },
    });

    dialogRef.afterClosed().subscribe((dado) => {
      if (dado) {
        this.localStorageService.getItem(USER_TOKEN).subscribe((token : string) => {
          const prestadorId = this.jwtHelper.recuperaIdToken(token);

          this.servicosService.desativarAdicional(prestadorId, adicional.servicoDetalhadoId,
            adicional.id, token)
            .subscribe(() => {
              this.buscarServicosDetalhadosPorPrestador(this.prestadorId, this.paginaAtual,
                this.quantidadeItens);
            });
        });
      }
    });
  }

  openDialogInsercao(servico:ServicoDetalhado) {
    const data = {
      titulo: 'NOVO_ADICIONAL',
      textoBotao: 'SALVAR',
      adicional: {
        nome: '', descricao: '', preco: 0, servicoDetalhadoId: servico.id,
      },
    };

    const dialogRef = this.dialog.open(AdicionalDialogComponent, {
      width: '600px',
      data: { ...data },
    });

    dialogRef.afterClosed().subscribe((adicional:Adicional) => {
      if (adicional) {
        this.localStorageService.getItem(USER_TOKEN).subscribe((token : string) => {
          const prestadorId = this.jwtHelper.recuperaIdToken(token);

          this.servicosService.adicionarAdicional(prestadorId,
            adicional.servicoDetalhadoId, adicional, token).subscribe(() => {
            this.buscarServicosDetalhadosPorPrestador(this.prestadorId, this.paginaAtual,
              this.quantidadeItens);
          });
        });
      }
    });
  }
}
