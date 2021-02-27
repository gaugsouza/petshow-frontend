import { Component, Inject, Input, OnInit } from '@angular/core';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';

@Component({
  selector: 'app-confirmacao-cancelamento',
  templateUrl: './confirmacao-cancelamento.component.html',
  styleUrls: ['./confirmacao-cancelamento.component.scss'],
})
export class ConfirmacaoCancelamentoComponent implements OnInit {
  @Input('texto') textoConfirmacao:string

  constructor(
    public dialogRef: MatDialogRef<ConfirmacaoCancelamentoComponent>,
    @Inject(MAT_DIALOG_DATA) public data: string) { }

  ngOnInit = (): void => {
  }

  onNoClick(): void {
    this.dialogRef.close();
  }
}
