import { Component, OnInit, Input, Output, EventEmitter } from '@angular/core';
import { Cliente } from 'src/app/interfaces/cliente';
import { FormControl, Validators } from '@angular/forms';

@Component({
  selector: 'app-informacoes-pessoais',
  templateUrl: './informacoes-pessoais.component.html',
  styleUrls: ['./informacoes-pessoais.component.scss']
})
export class InformacoesPessoaisComponent implements OnInit {
  @Input('usuario') usuario:Cliente;
  @Output('altera-telefone') alteraTelefone = new EventEmitter<string>();

  alterarTelefone:boolean = false;
  telefone:string;
  constructor() { }

  telefoneFormControl = new FormControl('', [
    Validators.required,
    Validators.maxLength(11)
  ])
  ngOnInit(): void {
  }

  abrirFormAlterarTelefone() {
    this.telefone = {...this.usuario}.telefone;
    this.alterarTelefone = true;
  }

  hasErrors() {
    return this.telefoneFormControl.hasError('required');
  }
  salvar() {

    this.alterarTelefone = false;
    this.alteraTelefone.emit(this.telefone);
  }

  cancelar() {
    this.alterarTelefone = false;
  }

}
