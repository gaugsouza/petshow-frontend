import {
  Component, OnInit, Input, Output, EventEmitter,
} from '@angular/core';
import { AnimalEstimacao } from 'src/app/interfaces/animalEstimacao';
import { MyErrorStateMatcher } from 'src/app/classes/my-error-state-matcher';
import { FormControl, Validators } from '@angular/forms';
import { UsuarioService } from 'src/app/servicos/usuario.service';
import { LocalStorageService } from 'src/app/servicos/local-storage.service';
import { USER_TOKEN } from 'src/app/util/constantes';
import { TipoAnimal } from 'src/app/enum/TipoAnimal';

@Component({
  selector: 'app-formulario-animal',
  templateUrl: './formulario-animal.component.html',
  styleUrls: ['./formulario-animal.component.scss'],
})
export class FormularioAnimalComponent implements OnInit {
  @Input() animal: AnimalEstimacao;

  @Input() isInsert: boolean;

  @Output('adiciona-animal') adicionaAnimal = new EventEmitter<AnimalEstimacao>();

  @Output('atualiza-animal') atualizaAnimalInput = new EventEmitter<AnimalEstimacao>();

  @Output('cancelar-operacao') cancelaOperacao = new EventEmitter<any>();

  @Input() exibeFormulario:Boolean;

  matcher = new MyErrorStateMatcher();

  nomeFormControl = new FormControl('', [
    Validators.required,
    Validators.minLength(3),
  ]);

  public tiposAnimal = [];

  nomeTipo:string = '';

  porte:string = '';

  pelagem:string = '';

  tipoAnimal:TipoAnimal;

  constructor(private usuarioService:UsuarioService,
              private localStorageService: LocalStorageService) { }

  ngOnInit(): void {
    // this.tipoAnimal = {...this.animal.tipo};
    console.log(this.animal);
    this.getTiposAnimal();
  }

  hasErrors() {
    return this.nomeFormControl.invalid || (this.isInsert && !this.tipoValido(this.tipoAnimal));
  }

  getSelectionValue() {
    return this.animal.tipo;
  }

  insereAnimal() {
    const tipo = this.tiposAnimal.find(tipo => tipo.nome === this.tipoAnimal.nome && tipo.porte === this.tipoAnimal.porte && tipo.pelagem === this.tipoAnimal.pelagem);
    this.animal = { ...this.animal, tipo }
    this.adicionaAnimal.emit(this.animal);
    this.afterInsert();
  }

  atualizaAnimal() {
    this.atualizaAnimalInput.emit(this.animal);
    this.afterInsert();
  }

  private afterInsert() {
    this.nomeTipo = '';
    this.limpaCampos();

    this.animal = {
      nome: '',
      tipo: { nome: '', porte: '', pelagem: ''},
    };

  }
  cancelarOperacao() {
    this.afterInsert();
    this.cancelaOperacao.emit();
  }

  getNomesTipoAnimal(): string[] {
    return [... new Set((this.tiposAnimal || []).map(el => el.nome))];
  }

  possuiPortes(nomeTipo:string):boolean {
    return this.tiposAnimal.filter(tipo => tipo.nome === nomeTipo).map(tipo => !!tipo.porte).reduce((acc, el) => acc && el, true);
  }

  getPortesAnimal(nomeTipo:string) {
    return [... new Set(this.tiposAnimal
    .filter(tipo => tipo.nome === nomeTipo)
    .filter(tipo => !!tipo.porte)
    .map(tipo => tipo.porte))];
  }

  possuiPelagem(nomeTipo:string) {
    return this.tiposAnimal.filter(tipo => tipo.nome === nomeTipo).map(tipo => !!tipo.pelagem).reduce((acc, el) => acc && el, true);
  }

  getPelagensAnimal(nomeTipo:string) {
    return [... new Set(this.tiposAnimal
    .filter(tipo => tipo.nome === nomeTipo)
    .filter(tipo => !!tipo.pelagem)
    .map(tipo => tipo.pelagem))];
  }

  limpaCampos() {
    this.porte = '';
    this.pelagem = '';
    this.tipoAnimal = {
      nome: '',
      porte: '',
      pelagem: ''
    };
  }

  montaTipo(campo, valor) {
    this.tipoAnimal = {
      ...this.tipoAnimal,
      [campo]: valor
    };
  }

  tipoValido = (tipo:TipoAnimal):boolean => {
    if(!tipo) {
      return false;
    }

    const possuiNome = !!tipo.nome && tipo.nome !== 'VAZIO';
    const possuiPorte = (this.possuiPortes(tipo.nome) && !!tipo.porte) || (this.getPortesAnimal(tipo.nome) || []).length === 0;
    const possuiPelagem = (this.possuiPelagem(tipo.nome) && !!tipo.pelagem) || (this.getPelagensAnimal(tipo.nome) || []).length === 0;

   return possuiNome && possuiPorte && possuiPelagem;
  }

  getTiposAnimal() {
    this.localStorageService.getItem(USER_TOKEN).subscribe((token:string) => {
      this.usuarioService.buscarTiposAnimalEstimacao(token).subscribe(
        (tipos) => {
          tipos.forEach((tipo:any) => {
            this.tiposAnimal.push(tipo);
          });
          console.log(this.tiposAnimal);
        },
      );
    });
  }

  limpa() {
    this.afterInsert();
  }
}
