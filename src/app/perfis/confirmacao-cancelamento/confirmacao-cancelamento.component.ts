import {
  Component, Inject, Input, OnInit,
} from '@angular/core';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';

@Component({
  selector: 'app-confirmacao-cancelamento',
  templateUrl: './confirmacao-cancelamento.component.html',
  styleUrls: ['./confirmacao-cancelamento.component.scss'],
})
export class ConfirmacaoCancelamentoComponent implements OnInit {
  @Input('texto') textoConfirmacao:string

  constructor(
    @Inject(MAT_DIALOG_DATA) public data: string,

    public dialogRef: MatDialogRef<ConfirmacaoCancelamentoComponent>,
  ) { }

  onNoClick(): void {
    this.dialogRef.close();
  }

  ngOnInit = (): void => {
  }
}
