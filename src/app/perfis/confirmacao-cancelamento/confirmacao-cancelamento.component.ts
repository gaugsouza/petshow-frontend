import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-confirmacao-cancelamento',
  templateUrl: './confirmacao-cancelamento.component.html',
  styleUrls: ['./confirmacao-cancelamento.component.scss']
})
export class ConfirmacaoCancelamentoComponent implements OnInit {

  confirmacaoCancelamento: Boolean;

  constructor(
  ) { }

  ngOnInit(): void {
  }

  confirmaCancelamento() {
    this.confirmacaoCancelamento = true;
  }

}
