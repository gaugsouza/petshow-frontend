import { Component, OnInit } from '@angular/core';
import { ServicosService } from '../servicos/servicos.service';
import { Servico } from '../interfaces/servico';
import { SERVICOS } from '../util/tipo-servico';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.scss'],
})
export class HomeComponent implements OnInit {
  servicos:Servico[];

  constructor(private servicoService: ServicosService) {}

  ngOnInit(): void {
    this.servicoService.getTipos().subscribe((servicos) => {
      this.servicos = JSON.parse(servicos) || SERVICOS;
    },
    () => {
      this.servicos = SERVICOS;
    });
  }
}
