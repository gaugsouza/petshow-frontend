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
import { ServicoPrecoDialogComponent } from '../servico-preco-dialog/servico-preco-dialog.component';
import { ConfirmacaoCancelamentoComponent } from 'src/app/perfis/confirmacao-cancelamento/confirmacao-cancelamento.component';
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

  constructor(private cancelamento: MatDialog,
              private servicosService: ServicosService,
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

  // removeServico(servico:ServicoDetalhado) {
  //   this.removerServico.emit(servico);
  // }

  removeServico(servico:ServicoDetalhado) {
    const cancelRef = this.cancelamento.open(ConfirmacaoCancelamentoComponent,
      {
        data: 'DESEJA_CONFIRMAR_REMOCAO',
      });
    cancelRef.afterClosed().subscribe((result) => {
      if (result) {
        this.removerServico.emit(servico);
      }
    });
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

  openConfirmationDialogAdicional(adicional){
    const data = {mensagem: "CONFIRMAR_DELECAO_ADICIONAL",
                  response: true}

    const dialogRef = this.dialog.open(ConfirmationDialogComponent, {
      width: '400px',
      data: { ...data },
    });

    dialogRef.afterClosed().subscribe((data) => {
      if (data) {
        if(data.response){
          this.localStorageService.getItem(USER_TOKEN).subscribe((token : string) => {
            let prestadorId = this.jwtHelper.recuperaIdToken(token)

            this.servicosService.desativarAdicional(prestadorId, adicional.servicoDetalhadoId, adicional.id, token)
              .subscribe((response) => {              
                this.buscarServicosDetalhadosPorPrestador(this.prestadorId, this.paginaAtual, this.quantidadeItens);
            })
          });
        }
      }
    });
  }

  openConfirmationDialogPrecoPorTipo(servico:ServicoDetalhado, precoPorTipo:ServicoDetalhadoTipoAnimal){
    const data = {mensagem: precoPorTipo.ativo ? 'ATIVAR_PRECO_POR_TIPO' : 'DESATIVAR_PRECO_POR_TIPO',
                  response: true}
    const estadoInicial = ! precoPorTipo.ativo;
    const dialogRef = this.dialog.open(ConfirmationDialogComponent, {
      width: '400px',
      data: { ...data},
    });

    dialogRef.afterClosed().subscribe((data) => {
      if (data) {
        if(data.response){
          this.localStorageService.getItem(USER_TOKEN).subscribe((token : string) => {
            this.servicosService.atualizarTipoAnimalAceito(this.prestadorId, servico.id, precoPorTipo.tipoAnimal.id, precoPorTipo, token)
                .subscribe(() => this.buscarServicosDetalhadosPorPrestador(this.prestadorId, this.paginaAtual,this.quantidadeItens));
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


  openDialogInsercao(servico:ServicoDetalhado){
    let data = {
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

  openDialogServicoPreco(acao:string, servico:ServicoDetalhado, precoPorTipo?:ServicoDetalhadoTipoAnimal){
    let data = {
      titulo: servico.tipo.nome,
      servico: servico,
      precoPorTipo: precoPorTipo,
      acao: acao
    }

    const dialogRef = this.dialog.open(ServicoPrecoDialogComponent, {
      width: '600px',
      data: { ...data},
    });

    dialogRef.afterClosed().subscribe((precoPorTipo:ServicoDetalhadoTipoAnimal) => {
      if (precoPorTipo) {
        this.localStorageService.getItem(USER_TOKEN).subscribe((token : string) => {
          if(acao === 'INSERIR'){
            this.servicosService.adicionarTipoAnimalAceito(this.prestadorId, servico.id, precoPorTipo.tipoAnimal.id, precoPorTipo, token)
              .subscribe(() => this.buscarServicosDetalhadosPorPrestador(this.prestadorId, this.paginaAtual,this.quantidadeItens));
          }

          if(acao === 'ATUALIZAR'){
            this.servicosService.atualizarTipoAnimalAceito(this.prestadorId, servico.id, precoPorTipo.tipoAnimal.id, precoPorTipo, token)
              .subscribe(() => this.buscarServicosDetalhadosPorPrestador(this.prestadorId, this.paginaAtual,this.quantidadeItens));
          }
        });
      }
    });
  }
}
