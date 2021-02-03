import { Component, OnInit } from '@angular/core';
import { MatDialogRef } from '@angular/material/dialog';

@Component({
  selector: 'app-confirmacao-cancelamento',
  templateUrl: './confirmacao-cancelamento.component.html',
  styleUrls: ['./confirmacao-cancelamento.component.scss']
})
export class ConfirmacaoCancelamentoComponent implements OnInit {

  constructor(
    public dialogRef: MatDialogRef<ConfirmacaoCancelamentoComponent>,
  ) { }

  onNoClick(): void {
    this.dialogRef.close();
  }

  ngOnInit(): void {
  }

}
