import { Component, Inject, OnInit } from '@angular/core';
import { MatDialog, MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { Negociacao } from 'src/app/interfaces/negociacao';
import { ConfirmacaoCancelamentoComponent } from 'src/app/perfis/confirmacao-cancelamento/confirmacao-cancelamento.component';

@Component({
  selector: 'app-modal-negociacao',
  templateUrl: './modal-negociacao.component.html',
  styleUrls: ['./modal-negociacao.component.scss'],
})
export class ModalNegociacaoComponent implements OnInit {
  preco:number = 0;

  constructor(public dialogRef:MatDialogRef<ModalNegociacaoComponent>,
    @Inject(MAT_DIALOG_DATA) public data:Negociacao,
    public dialog:MatDialog) { }

  ngOnInit = (): void => {
  }

  onNoClick(): void {
    const ref = this.dialog.open(ConfirmacaoCancelamentoComponent, {
      data: 'DESEJA_CONFIRMAR_CANCELAMENTO',
      width: '200px',
    });

    ref.afterClosed().subscribe((result) => {
      if (result) {
        this.dialogRef.close();
        this.data = null;
      }
    });
  }

  hasErrors() {
    return (this.preco || 0) <= 0;
  }

  alteraPreco() {
    this.data = {
      ...this.data,
      precoOferta: this.preco,
      respostaOferta: null,
    };
  }
}
