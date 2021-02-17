import {
  Component, OnInit, Input, Output, EventEmitter, ViewChild, ViewContainerRef,
} from '@angular/core';
import { ServicoDetalhado } from 'src/app/interfaces/servico-detalhado';
import { BANHO } from 'src/app/util/tipo-servico';
import { MyErrorStateMatcher } from 'src/app/classes/my-error-state-matcher';
import { ServicosService } from 'src/app/servicos/servicos.service';
import { FormControl, Validators } from '@angular/forms';
import { Servico } from 'src/app/interfaces/servico';
import { DynamicContentInjectorService } from 'src/app/servicos/dynamic-content-injector.service';
import { Adicional } from 'src/app/interfaces/adicional';
import { UsuarioService } from 'src/app/servicos/usuario.service';
import { TipoAnimal } from 'src/app/enum/TipoAnimal';
import { ServicoDetalhadoTipoAnimal } from 'src/app/interfaces/servico-detalhado-tipo-animal';
@Component({
  selector: 'app-formulario-servico',
  templateUrl: './formulario-servico.component.html',
  styleUrls: ['./formulario-servico.component.scss'],
})
export class FormularioServicoComponent implements OnInit {
  private viewContainerRef:ViewContainerRef;

  @ViewChild('adicionais', { read: ViewContainerRef, static: false }) set reference(reference:ViewContainerRef) {
    if (reference) {
      this.viewContainerRef = reference;
      this.dynamicLoader.setViewContainerRef(this.viewContainerRef);
    }
  }

  @Input() servico: ServicoDetalhado = {
    precoPorTipo: [],
    tipo: null,
    adicionais: [],
  };

  servicos:Servico[];

  gatoChecked:Boolean;

  cachorroChecked:Boolean;

  tiposAnimais:TipoAnimal[];

  tiposInputModel:any;

  tipoChecked:any;

  @Output('adiciona-servico') adicionaServico = new EventEmitter<ServicoDetalhado>();

  @Output('cancelar-operacao') cancelaOperacao = new EventEmitter<any>();

  @Input() exibeFormulario:Boolean;

  matcher = new MyErrorStateMatcher();

  precoFormControl = new FormControl('', [
    Validators.required,
  ]);

  descricaoFormControl = new FormControl('', [
    Validators.required,
  ]);

  constructor(private servicoService:ServicosService,
              private usuarioService:UsuarioService,
              private dynamicLoader:DynamicContentInjectorService) {}

  ngOnInit(): void {
    this.servicoService.getTipos().subscribe((servicos) => {
      this.servicos = JSON.parse(servicos);
    },
    () => {
      this.servicos = [];
    });

    this.usuarioService.buscarTiposAnimalEstimacao().subscribe((tipos) => {
      this.tiposAnimais = JSON.parse(tipos);
      this.limpaCampos(this.tiposAnimais);
    },
    () => {
      this.tiposAnimais = [];
    });
  }

  criaInputModel = (tiposAnimal:TipoAnimal[]) => {
    const tiposComPrecos = tiposAnimal.map((el) => ({ tipo: { ...el }, preco: 0 }));

    return tiposComPrecos.map((el) => el.tipo.nome)
      .reduce((acc, chave) => {
        const elementos = tiposComPrecos.filter((el) => el.tipo.nome === chave);
        if (elementos.length === 1) {
          return ({ ...acc, [chave]: { ...elementos[0] } });
        }

        const pelagens = [...new Set(elementos.map((el) => el.tipo.pelagem))];

        return {
          ...acc,
          [chave]: [
            ...pelagens.map((pelagem) => {
              const portes = elementos
                .filter((el) => el.tipo.pelagem === pelagem && el.tipo.nome === chave);
              return {
                pelagem,
                portes: [
                  ...portes.map((porte) => ({
                    porte: porte.tipo.porte,
                    id: porte.tipo.id,
                    preco: null,
                  })),
                ],
              };
            }),
          ],
        };
      }, {});
  }

  limpaCampos(tipoAnimais:TipoAnimal[]) {
    this.tiposInputModel = this.criaInputModel(tipoAnimais);
    this.tipoChecked = this.criaChecked();
  }

  getInputModelKeys() {
    return Object.keys(this.tiposInputModel) || [];
  }

  criaChecked() {
    return this.getInputModelKeys()
      .reduce((acc, chave) => ({ ...acc, [chave]: false }), {});
  }

  toggleChecked(chave:string) {
    this.tipoChecked[chave] = !this.tipoChecked[chave];
  }

  validaChecked():boolean {
    return Object.keys(this.tipoChecked)
      .filter((label) => this.tipoChecked[label] === true).length > 0;
  }

  private getPrecoServicoPreenchido() {
    const precos = this.getInputModelKeys()
      .reduce((precosServico, item) => {
        if (!this.tiposInputModel[item].length) {
          return [
            ...precosServico,
            {
              preco: this.tiposInputModel[item].preco || 0,
              id: this.tiposInputModel[item].tipo.id,
            },
          ];
        }
        const portes = this.tiposInputModel[item]
          .reduce((acc, el) => [...acc, ...el.portes], []);

        return [...precosServico, ...portes
          .map((porte) => ({ id: porte.id, preco: porte.preco || 0 }))];
      }, []);

    return precos;
  }

  validaPrecos() {
    const precos = this.getPrecoServicoPreenchido()
      .map((item) => item.preco);
    return precos.filter((preco) => preco > 0).length;
  }

  hasErrors() {
    return !this.validaChecked() || !this.validaPrecos() || this.precoFormControl.hasError('required');
  }

  getTipoServico() {
    return (this.servico.tipo || BANHO).id;
  }

  insereServico() {
    this.adicionaServico.emit(this.trataServico(this.servico));
    this.viewContainerRef.clear();
    this.limpaCampos(this.tiposAnimais);
  }

  private trataServico = (servico:ServicoDetalhado): ServicoDetalhado => {
    const adicionais = [...(servico.adicionais || [])
      .filter((adicional) => adicional.nome !== null && adicional.nome !== '')];

    const animaisChecados = Object.keys(this.tipoChecked)
      .filter((chave) => this.tipoChecked[chave] === true);

    const animaisPreenchidos = this.getPrecoServicoPreenchido()
      .filter((el) => el.preco > 0);

    const animaisAceitos = this.tiposAnimais
      .filter((tipo) => animaisChecados.indexOf(tipo.nome) !== -1
    && animaisPreenchidos.map((el) => el.id).indexOf(tipo.id) !== -1);

    const precoPorTipo: ServicoDetalhadoTipoAnimal[] = animaisAceitos
      .reduce((acc, tipo, index) => {
        const tipoAnimal = this.tiposInputModel[tipo.nome];
        if (!tipoAnimal.length && tipoAnimal.preco && tipoAnimal.preco > 0) {
          return [...acc, { id: index + 1, tipoAnimal: tipo, preco: tipoAnimal.preco }];
        }

        const pelagem = tipoAnimal.find((el:any) => el.pelagem === tipo.pelagem);
        const pelagemMapeada = pelagem.portes.filter((el:any) => el.porte === tipo.porte
        && el.preco && el.preco > 0)
          .map((porte:any) => ({
            id: index + 1,
            tipoAnimal: tipo,
            preco: porte.preco,
          }));

        return [...acc, ...pelagemMapeada];
      }, []);

    return {
      ...servico,
      adicionais,
      animaisAceitos,
      precoPorTipo,
    };
  }

  cancelarOperacao() {
    this.viewContainerRef.clear();
    this.tipoChecked = Object.keys(this.tipoChecked).map((el) => {
      this.tipoChecked[el] = false;
      return this.tipoChecked[el];
    });
    this.cancelaOperacao.emit();
  }

  getTiposServico() {
    return this.servicos;
  }

  toggleCheckBoxGato() {
    this.gatoChecked = !this.gatoChecked;
  }

  toggleCheckBoxCachorro() {
    this.cachorroChecked = !this.cachorroChecked;
  }

  addAdicionalComponent() {
    const adicional = this.dynamicLoader.addDynamicComponent(({
      id: null, preco: 0.0, descricao: '', nome: '',
    }) as Adicional);
    this.servico.adicionais = [...(this.servico.adicionais || []), adicional];
  }
}
