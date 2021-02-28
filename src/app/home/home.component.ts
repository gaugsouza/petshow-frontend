import { Component, OnInit } from '@angular/core';
import { ServicosService } from 'src/app/servicos/servicos.service';
import { Servico } from 'src/app/interfaces/servico';
import { Cidade, ConsultaEstadosService, Estado } from 'src/app/servicos/consulta-estados.service';
import { Observable } from 'rxjs';
import { FormControl } from '@angular/forms';
import { map, startWith } from 'rxjs/operators';

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

  filteredEstados: Observable<Estado[]>;
  filteredCidades: Observable<Cidade[]>;

  estadoFormControl:FormControl = new FormControl();
  cidadeFormControl:FormControl = new FormControl();

  constructor(private servicoService: ServicosService,
              private consultaEstados:ConsultaEstadosService) {}

  ngOnInit(): void {
    this.buscaEstados();
    this.cidadeFormControl.disable();
    this.filteredEstados = this.estadoFormControl.valueChanges
    .pipe(
      startWith(''),
      map(value => this._filter(value))
    );

    this.filteredCidades = this.cidadeFormControl.valueChanges
    .pipe(
      startWith(''),
      map(value => this._filterCidade(value || ''))
    );
  }

  displayEstado(estado:Estado) {
    return (estado || {}).estado || '';
  }

  displayCidade(cidade:Cidade) {
    return (cidade || {}).cidade || '';
  }

  private _filter(value:string|Estado) : Estado[] {
    
    const filterValue = typeof value === 'string' ? value.toLowerCase() : value.estado.toLowerCase();

    return this.estados.filter(estado => estado.estado.toLowerCase().includes(filterValue));
  }

  private _filterCidade(value:string|Cidade):Cidade[] {
    const filterValue = typeof value === 'string' ? value.toLowerCase() : value.cidade.toLowerCase();

    return this.cidades.filter(cidade => cidade.cidade.toLowerCase().includes(filterValue));
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
      this.cidadeFormControl.enable();
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
