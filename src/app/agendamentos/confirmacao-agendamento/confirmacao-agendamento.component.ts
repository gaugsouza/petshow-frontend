import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';

@Component({
  selector: 'app-confirmacao-agendamento',
  templateUrl: './confirmacao-agendamento.component.html',
  styleUrls: ['./confirmacao-agendamento.component.scss'],
})
export class ConfirmacaoAgendamentoComponent implements OnInit {
  status: string;

  constructor(private route:ActivatedRoute) { }

  ngOnInit(): void {
    this.status = this.route.snapshot.paramMap.get('status');
  }
}
