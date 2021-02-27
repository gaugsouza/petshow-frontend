import { Component, OnInit } from '@angular/core';
import { ServicosService } from 'src/app/servicos/servicos.service';
import { Servico } from 'src/app/interfaces/servico';
import { Cidade, ConsultaEstadosService, Estado } from 'src/app/servicos/consulta-estados.service';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.scss'],
})
export class HomeComponent implements OnInit {
  servicos:Servico[];

  grupos: string[] = [];
  estados:Estado[] = [];
  cidades:Cidade[] = [];

  cidadeSelecionada: Cidade;
  estadoSelecionado: Estado;

  loading:boolean = false;

  constructor(private servicoService: ServicosService,
              private consultaEstados:ConsultaEstadosService) {}

  ngOnInit(): void {
    this.buscaEstados();
  }

  buscaTipos(cidade?:Cidade) {
    this.servicos = null;
    this.loading = true;
    this.servicoService.getTiposPorCidade(cidade).subscribe((servicos) => {
      this.loading = false;
      console.log(servicos);
      this.servicos = JSON.parse(servicos || '[]');
      this.grupos = Array.from(new Set(this.servicos.map((servico) => servico.grupo)));
    },
    () => {
      // this.loading = false;
      this.servicos = [];
    })
  }

  buscaEstados() {
    this.consultaEstados.getEstados().subscribe((estados) => {
      this.estados = JSON.parse(estados);
    })
  }

  buscaCidades(estado:Estado) {
    this.cidades = [];
    this.cidadeSelecionada = null;
    this.estadoSelecionado = estado;
    this.consultaEstados.getCidades(this.estadoSelecionado.id).subscribe((cidades) => {
      this.cidades = JSON.parse(cidades);
    })
  }

  exibirServicosPorGrupo(grupo) {
    return this.servicos.filter((servico) => servico.grupo === grupo);
  }

  selecionaCidade(cidade:Cidade) {
    this.cidadeSelecionada = cidade;
    this.buscaTipos(cidade);
  }
}
