import { Component, Inject, OnInit } from '@angular/core';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';

@Component({
  selector: 'app-confirmacao-cancelamento',
  templateUrl: './confirmacao-cancelamento.component.html',
  styleUrls: ['./confirmacao-cancelamento.component.scss']
})
export class ConfirmacaoCancelamentoComponent implements OnInit {

  constructor(
    public dialogRef: MatDialogRef<ConfirmacaoCancelamentoComponent>,
    @Inject(MAT_DIALOG_DATA) public confirmacaoCancelamento: Boolean
  ) { }

  onNoClick(): void {
    this.dialogRef.close();
  }

  ngOnInit(): void {
  }

  // confirmaCancelamento() {
  //   this.confirmacaoCancelamento = true;
  // }

}
