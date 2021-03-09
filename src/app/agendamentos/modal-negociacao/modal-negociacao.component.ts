import { Component, Inject, OnInit } from '@angular/core';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { Negociacao } from 'src/app/interfaces/negociacao';

@Component({
  selector: 'app-modal-negociacao',
  templateUrl: './modal-negociacao.component.html',
  styleUrls: ['./modal-negociacao.component.scss'],
})
export class ModalNegociacaoComponent implements OnInit {
  preco:number = 0;

  constructor(public dialogRef:MatDialogRef<ModalNegociacaoComponent>,
    @Inject(MAT_DIALOG_DATA) public data:Negociacao) { }

  ngOnInit = (): void => {
  }

  onNoClick(): void {
    this.dialogRef.close();
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
