import { Component, OnInit } from '@angular/core';
import { ServicosService } from 'src/app/servicos/servicos.service';
import { Servico } from 'src/app/interfaces/servico';
import { Cidade, ConsultaEstadosService, Estado } from 'src/app/servicos/consulta-estados.service';
import { Observable } from 'rxjs';
import { FormControl } from '@angular/forms';
import { map, startWith } from 'rxjs/operators';
import { DataSharingService } from 'src/app/servicos/data-sharing.service';
import { LocalStorageService } from 'src/app/servicos/local-storage.service';
import { UsuarioService } from 'src/app/servicos/usuario.service';
import { USER_TOKEN } from 'src/app/util/constantes';

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
              private consultaEstados:ConsultaEstadosService,
              private dataSharingService:DataSharingService,
              private localStorageService:LocalStorageService,
              private usuarioService:UsuarioService) {}

  ngOnInit(): void {
    this.buscaEstados();
    this.cidadeFormControl.disable();

    this.filteredEstados = this.estadoFormControl.valueChanges
      .pipe(
        startWith(''),
        map((value) => this._filter(value)),
      );

    this.filteredCidades = this.cidadeFormControl.valueChanges
      .pipe(
        startWith(''),
        map((value) => this._filterCidade(value || '')),
      );
  }

  displayEstado = (estado:Estado) => (estado || {}).estado || ''

  displayCidade = (cidade:Cidade) => (cidade || {}).cidade || ''

  private _filter(value:string|Estado) : Estado[] {
    const filterValue = typeof value === 'string' ? value.toLowerCase() : value.estado.toLowerCase();

    return this.estados.filter((estado) => estado.estado.toLowerCase().includes(filterValue));
  }

  private _filterCidade(value:string|Cidade):Cidade[] {
    const filterValue = typeof value === 'string' ? value.toLowerCase() : value.cidade.toLowerCase();

    return this.cidades.filter((cidade) => cidade.cidade.toLowerCase().includes(filterValue));
  }

  buscaTipos(cidade?:Cidade) {
    if (!cidade) {
      return;
    }
    this.servicos = null;
    this.loading = true;
    this.servicoService.getTiposPorCidade(cidade).subscribe((servicos) => {
      this.loading = false;
      this.servicos = JSON.parse(servicos || '[]');
      this.grupos = Array.from(new Set(this.servicos.map((servico) => servico.grupo)));
    },
    () => {
      this.loading = false;
      this.servicos = [];
    });
  }

  buscaEstados() {
    this.consultaEstados.getEstados().subscribe((estados) => {
      this.estados = JSON.parse(estados);
      this.dataSharingService.isUsuarioLogado.subscribe((isLogado) => {
        if (isLogado) {
          this.validaCliente();
          return;
        }

        this.getLocalizacaoFromStorage();
      });
    });
  }

  getLocalizacaoFromStorage() {
    this.localStorageService.getItem('ESTADO').subscribe((estado:Estado) => {
      this.localStorageService.getItem('CIDADE').subscribe((cidade:Cidade) => {
        this.estadoSelecionado = estado;
        this.cidadeSelecionada = cidade;
        this.estadoFormControl.setValue(this.estadoSelecionado);
        this.cidadeFormControl.setValue(this.cidadeSelecionada);
        this.localStorageService.setItem('ESTADO', this.estadoSelecionado).subscribe();
        this.localStorageService.setItem('CIDADE', this.cidadeSelecionada).subscribe();
        this.buscaCidades(this.estadoSelecionado);

        setTimeout(() => {
          this.loading = true;
          this.cidadeFormControl.enable();
          this.cidadeSelecionada = cidade;
          this.buscaTipos(this.cidadeSelecionada);
        }, 1500);
      });
    });
  }

  validaCliente() {
    this.dataSharingService.isUsuarioLogado.subscribe((isLogado) => {
      if (!isLogado) {
        this.cidadeFormControl.disable();
        return;
      }
      this.localStorageService.getItem(USER_TOKEN).subscribe((token:string) => {
        this.usuarioService.getUsuario(token)
          .subscribe((usuario) => {
            if (usuario && this.usuarioService.isCliente(usuario)) {
              const { endereco: { cidade, estado } } = usuario;
              const estadoCliente:Estado = {
                id: estado,
                estado: null,
              };

              this.estadoSelecionado = this.estados.find((e) => e.id === estadoCliente.id);
              this.cidadeSelecionada = {
                estadoId: estado,
                cidade,
              };

              this.estadoFormControl.setValue(this.estadoSelecionado);
              this.cidadeFormControl.setValue(this.cidadeSelecionada);

              this.localStorageService.setItem('ESTADO', this.estadoSelecionado).subscribe();
              this.localStorageService.setItem('CIDADE', this.cidadeSelecionada).subscribe();
              this.buscaCidades(this.estadoSelecionado);
              setTimeout(() => {
                this.loading = true;
                this.cidadeFormControl.enable();
                this.cidadeSelecionada = {
                  estadoId: estado,
                  cidade,
                };
                this.buscaTipos(this.cidadeSelecionada);
              }, 1500);
            }
          });
      });
    });
  }

  buscaCidades(estado:Estado) {
    if (!estado) {
      return;
    }
    this.cidades = [];
    this.cidadeSelecionada = null;
    this.estadoSelecionado = estado;
    this.loading = true;
    this.consultaEstados.getCidades(this.estadoSelecionado.id).subscribe((cidades) => {
      this.cidades = JSON.parse(cidades);
      this.cidadeFormControl.enable();
    },
    () => {},
    () => {
      this.loading = false;
    });
  }

  exibirServicosPorGrupo(grupo) {
    return this.servicos.filter((servico) => servico.grupo === grupo);
  }

  selecionaCidade(cidade:Cidade) {
    if (!cidade) {
      return;
    }
    this.cidadeSelecionada = cidade;
    this.buscaTipos(cidade);
  }
}
