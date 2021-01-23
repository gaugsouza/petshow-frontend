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

@Component({
  selector: 'app-formulario-servico',
  templateUrl: './formulario-servico.component.html',
  styleUrls: ['./formulario-servico.component.scss'],
})
export class FormularioServicoComponent implements OnInit {
  @ViewChild('adicionais', {
    read: ViewContainerRef,
  }) viewContainerRef: ViewContainerRef;

  @Input() servico: ServicoDetalhado = {
    precoPorTipo:[],
    tipo: null,
    adicionais: [],
  };



  servicos:Servico[];

  gato_checked:Boolean;

  cachorro_checked:Boolean;

  tiposAnimais:TipoAnimal[];
  tiposInputModel:any;
  tipoChecked:any;

  // precosPorTipo:ServicoDetalhadoTipoAnimal[];

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
        this.tiposInputModel = this.criaInputModel(this.tiposAnimais);
        this.tipoChecked = this.criaChecked();
      },
      () => {
        this.tiposAnimais = [];
      })
  }


//////////////////////
  criaInputModel(tiposAnimal:TipoAnimal[]) {
    const tiposComPrecos = tiposAnimal.map(el => ({tipo:{...el}, preco: 0}));
    
    return tiposComPrecos.map(el => el.tipo.nome)
    .reduce((acc, chave) => {
      const elementos = tiposComPrecos.filter(el => el.tipo.nome === chave);
      if(elementos.length === 1) {
        return ({...acc, [chave]: {...elementos[0]}});
      }
      return ({...acc, [chave]:[...elementos]});
    }, {})
  }

  getInputModelKeys() {
    return Object.keys(this.tiposInputModel) || [];
  }
  criaChecked() {
    return this.getInputModelKeys().reduce((acc, chave) => ({...acc, [chave]:false}), {})
  }

  toggleChecked(chave:string) {
    this.tipoChecked[chave] = !this.tipoChecked[chave];
  }
////////////////////

  hasErrors() {
    return this.precoFormControl.hasError('required') || this.descricaoFormControl.hasError('minLength');
  }

  getTipoServico() {
    return (this.servico.tipo || BANHO).id;
  }

  insereServico() {
    this.adicionaServico.emit(this.trataServico(this.servico));
    this.viewContainerRef.clear();
  }

  private trataServico = (servico:ServicoDetalhado): ServicoDetalhado => {
    const adicionais = [...(servico.adicionais || []).filter((adicional) => adicional.nome !== null && adicional.nome !== '')];
    return { ...servico, adicionais };
  }

  cancelarOperacao() {
    this.viewContainerRef.clear();
    this.tipoChecked = Object.keys(this.tipoChecked).map(el => this.tipoChecked[el] = false);
    this.cancelaOperacao.emit();
  }

  getTiposServico() {
    return this.servicos;
  }

  toggleCheckBoxGato() {
    this.gato_checked= !this.gato_checked;
  }

  toggleCheckBoxCachorro() {
    this.cachorro_checked= !this.cachorro_checked;
  }  

  ngAfterViewInit() {
    this.dynamicLoader.setViewContainerRef(this.viewContainerRef);
  }

  addAdicionalComponent() {
    const adicional = this.dynamicLoader.addDynamicComponent(({
      id: null, preco: 0.0, descricao: '', nome: '',
    }) as Adicional);
    this.servico.adicionais = [...(this.servico.adicionais || []), adicional];
  }
}
