import { Component, OnInit, Input, Output, EventEmitter } from '@angular/core';
import { AnimalEstimacao } from 'src/app/interfaces/animalEstimacao';
import { TipoAnimal } from 'src/app/enum/TipoAnimal';
import {MyErrorStateMatcher} from '../../../classes/my-error-state-matcher';
import { FormControl, Validators } from '@angular/forms';
import { UsuarioService } from 'src/app/servicos/usuario.service';
import { PerfilUsuarioComponent } from '../../perfil-usuario.component';

@Component({
  selector: 'app-formulario-animal',
  templateUrl: './formulario-animal.component.html',
  styleUrls: ['./formulario-animal.component.scss']
})
export class FormularioAnimalComponent implements OnInit {
  @Input() animal: AnimalEstimacao = {
    nome: "",
    tipo: {id: 2, nome: 'GATO'}
  };
  @Output("adiciona-animal") adicionaAnimal = new EventEmitter<AnimalEstimacao>();
  @Output("atualiza-animal") atualizaAnimalInput = new EventEmitter<AnimalEstimacao>();
  @Output("cancelar-operacao") cancelaOperacao = new EventEmitter<any>();
  @Input() exibeFormulario:Boolean;

  matcher = new MyErrorStateMatcher();
  nomeFormControl = new FormControl('', [
    Validators.required,
    Validators.minLength(3)
  ]);

  public tiposAnimal = [];

  constructor(private usuarioService:UsuarioService) { }

  ngOnInit(): void {
    this.getTiposAnimal()
  }
  
  hasErrors() {
    return this.nomeFormControl.hasError('required') || this.nomeFormControl.hasError('minLength');
  }

  getSelectionValue() {
    return this.animal.tipo;
  }

  insereAnimal() {
    this.adicionaAnimal.emit(this.animal);
  }

  atualizaAnimal() {
    this.atualizaAnimalInput.emit(this.animal);
  }

  cancelarOperacao() {
    this.cancelaOperacao.emit();
  }

  getTiposAnimal() {
    this.usuarioService.buscarTiposAnimalEstimacao().subscribe(
      tipos => {
        tipos.forEach(tipo => {
          this.tiposAnimal.push(tipo);  
        });
      }
    );
  }
  
  limpa() {
    this.animal = {
      nome: "",
      tipo: this.tiposAnimal[0]
    };
  }
}
