import { Component, OnInit } from '@angular/core';
import { ServicosService } from '../servicos/servicos.service';
import { Servico } from '../interfaces/servico';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.scss'],
})
export class HomeComponent implements OnInit {
  servicos:Servico[];

  grupos: string[];

  constructor(private servicoService: ServicosService) {}

  ngOnInit(): void {
    this.servicoService.getTipos().subscribe((servicos) => {
      this.servicos = JSON.parse(servicos);
      this.grupos = Array.from(new Set(this.servicos.map((servico) => servico.grupo)));
    });
  }

  exibirServicosPorGrupo(grupo) {
    return this.servicos.filter((servico) => servico.grupo === grupo);
  }
}
