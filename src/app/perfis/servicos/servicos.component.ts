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
import { ServicoDetalhadoTipoAnimal } from 'src/app/interfaces/servico-detalhado-tipo-animal';
import { ServicoPrecoDialogComponent } from 'src/app/perfis/servico-preco-dialog/servico-preco-dialog.component';
import { AdicionalDialogComponent } from 'src/app/perfis/adicional-dialog/adicional-dialog.component';
import { ConfirmationDialogComponent } from 'src/app/perfis/confirmation-dialog/confirmation-dialog.component';
import { UsuarioService } from 'src/app/servicos/usuario.service';

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

  tiposAnimais: string[];

  constructor(private cancelamento: MatDialog,
              private servicosService: ServicosService,
              private localStorageService: LocalStorageService,
              @Inject('ServicoNotificationService') private servicoNotification: NotificationService<ServicoDetalhado>,
              public dialog:MatDialog,
              public jwtHelper:JwtHelper,
              public usuarioService: UsuarioService) { }

  ngOnInit(): void {
    this.servicoNotification.notify({});
    this.servicoNotification.obs.subscribe(() => {
      this.buscarServicosDetalhadosPorPrestador(this.prestadorId, this.paginaAtual,
        this.quantidadeItens);
    });
    this.usuarioService.buscarTiposAnimalEstimacao().subscribe(
      (response) => {
        const tipos = JSON.parse(response);
        this.tiposAnimais = Array.from(new Set(tipos.map((tipo) => tipo.nome)));
      },
    );
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

  openDialogAtualizacao(adicional: Adicional) {
    const newAdicional: Adicional = {
      id: adicional.id,
      nome: adicional.nome,
      descricao: adicional.descricao,
      preco: adicional.preco,
      servicoDetalhadoId: adicional.servicoDetalhadoId,
      ativo: adicional.ativo,
    };

    const data = {
      titulo: 'ALTERAR_ADICIONAL',
      textoBotao: 'ALTERAR',
      adicional: newAdicional,
    };

    const dialogRef = this.dialog.open(AdicionalDialogComponent, {
      width: '600px',
      data: { ...data },
    });

    dialogRef.afterClosed().subscribe((response:Adicional) => {
      if (response) {
        this.localStorageService.getItem(USER_TOKEN).subscribe((token : string) => {
          const prestadorId = this.jwtHelper.recuperaIdToken(token);

          this.servicosService.atualizarAdicional(prestadorId, response.servicoDetalhadoId,
            response.id, response, token)
            .subscribe(() => {
              this.buscarServicosDetalhadosPorPrestador(this.prestadorId, this.paginaAtual,
                this.quantidadeItens);
            });
        });
      }
    });
  }

  openConfirmationDialogAdicional(adicional) {
    const estadoInicial = !adicional.ativo;
    const data = {
      mensagem: 'CONFIRMAR_DELECAO_ADICIONAL',
      response: true,
    };

    const dialogRef = this.dialog.open(ConfirmationDialogComponent, {
      width: '400px',
      data: { ...data },
    });

    dialogRef.afterClosed().subscribe((dado) => {
      if (dado) {
        if (dado.response) {
          this.localStorageService.getItem(USER_TOKEN).subscribe((token : string) => {
            const prestadorId = this.jwtHelper.recuperaIdToken(token);
            this.servicosService.desativarAdicional(prestadorId,
              adicional.servicoDetalhadoId, adicional.id, adicional.ativo, token)
              .subscribe(() => {
                this.buscarServicosDetalhadosPorPrestador(
                  this.prestadorId, this.paginaAtual, this.quantidadeItens,
                );
              });
          });
        } else {
          adicional.ativo = estadoInicial;
        }
      }
    });
    dialogRef.backdropClick().subscribe(() => {
      adicional.ativo = estadoInicial;
    });
  }

  /* eslint-disable no-param-reassign */
  openConfirmationDialogPrecoPorTipo(
    servico:ServicoDetalhado,
    precoPorTipo:ServicoDetalhadoTipoAnimal,
  ) {
    const data = {
      mensagem: precoPorTipo.ativo ? 'ATIVAR_PRECO_POR_TIPO' : 'DESATIVAR_PRECO_POR_TIPO',
      response: true,
    };
    const estadoInicial = !precoPorTipo.ativo;
    const dialogRef = this.dialog.open(ConfirmationDialogComponent, {
      width: '400px',
      data: { ...data },
    });

    dialogRef.afterClosed().subscribe((dado) => {
      if (dado) {
        if (dado.response) {
          this.localStorageService.getItem(USER_TOKEN).subscribe((token : string) => {
            this.servicosService.atualizarTipoAnimalAceito(
              this.prestadorId, servico.id,
              precoPorTipo.tipoAnimal.id, precoPorTipo, token,
            )
              .subscribe(() => this.buscarServicosDetalhadosPorPrestador(
                this.prestadorId, this.paginaAtual, this.quantidadeItens,
              ));
          });
        } else {
          precoPorTipo.ativo = estadoInicial;
        }
      }
    });

    dialogRef.backdropClick().subscribe(() => {
      precoPorTipo.ativo = estadoInicial;
    });
  }

  openConfirmationDialogServicoDetalhado(servico:ServicoDetalhado) {
    const data = {
      mensagem: servico.ativo ? 'ATIVAR_SERVICO_DETALHADO' : 'DESATIVAR_SERVICO_DETALHADO',
      response: true,
    };
    const estadoInicial = !servico.ativo;
    const dialogRef = this.dialog.open(ConfirmationDialogComponent, {
      width: '400px',
      data: { ...data },
    });

    dialogRef.afterClosed().subscribe((dado) => {
      if (dado) {
        if (dado.response) {
          this.localStorageService.getItem(USER_TOKEN).subscribe((token : string) => {
            this.servicosService.atualizarServicoDetalhado(this.prestadorId,
              servico.id, servico.ativo, token)
              .subscribe(() => this.buscarServicosDetalhadosPorPrestador(
                this.prestadorId, this.paginaAtual, this.quantidadeItens,
              ));
          });
        } else {
          servico.ativo = estadoInicial;
        }
      }
    });

    dialogRef.backdropClick().subscribe(() => {
      servico.ativo = estadoInicial;
    });
  }

  /* eslint-enable no-param-reassign */
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

  openDialogServicoPreco(acao:string, servico:ServicoDetalhado,
    preco?:ServicoDetalhadoTipoAnimal) {
    const data = {
      titulo: servico.tipo.nome,
      servico,
      precoPorTipo: preco,
      acao,
    };

    const dialogRef = this.dialog.open(ServicoPrecoDialogComponent, {
      width: '600px',
      data: { ...data },
    });

    dialogRef.afterClosed().subscribe((precoPorTipo:ServicoDetalhadoTipoAnimal) => {
      if (precoPorTipo) {
        this.localStorageService.getItem(USER_TOKEN).subscribe((token : string) => {
          if (acao === 'INSERIR') {
            this.servicosService.adicionarTipoAnimalAceito(this.prestadorId, servico.id,
              precoPorTipo.tipoAnimal.id, precoPorTipo, token)
              .subscribe(() => this.buscarServicosDetalhadosPorPrestador(this.prestadorId,
                this.paginaAtual, this.quantidadeItens));
          }

          if (acao === 'ATUALIZAR') {
            this.servicosService.atualizarTipoAnimalAceito(this.prestadorId, servico.id,
              precoPorTipo.tipoAnimal.id, precoPorTipo, token)
              .subscribe(() => this.buscarServicosDetalhadosPorPrestador(this.prestadorId,
                this.paginaAtual, this.quantidadeItens));
          }
        });
      }
    });
  }

  possuiTipo = (servico: ServicoDetalhado, nome: string) => servico.precoPorTipo
    .map((preco) => preco.tipoAnimal.nome)
    .includes(nome);
}
