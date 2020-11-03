import { Component, OnInit, Input, Output, EventEmitter } from '@angular/core';
import { ServicoDetalhado } from 'src/app/interfaces/servico-detalhado';
import { BANHO, SERVICOS } from 'src/app/util/tipo-servico';
import { MyErrorStateMatcher } from 'src/app/classes/my-error-state-matcher';
import { ServicosService } from 'src/app/servicos/servicos.service';
import { FormControl, Validators } from '@angular/forms';
import { Servico } from 'src/app/interfaces/servico';

@Component({
  selector: 'app-formulario-servico',
  templateUrl: './formulario-servico.component.html',
  styleUrls: ['./formulario-servico.component.scss']
})
export class FormularioServicoComponent implements OnInit {
  @Input() servico: ServicoDetalhado = {
    preco: 0.0,
    tipo: BANHO
  };

  servicos:Servico[];

  @Output('adiciona-servico') adicionaServico = new EventEmitter<ServicoDetalhado>();
  @Output('cancelar-operacao') cancelaOperacao = new EventEmitter<any>();

  @Input() exibeFormulario:Boolean;

  matcher = new MyErrorStateMatcher();

  precoFormControl = new FormControl('', [
    Validators.required
  ])

  descricaoFormControl = new FormControl('', [
    Validators.required
  ])

  
  hasErrors() {
    return this.precoFormControl.hasError('required') || this.descricaoFormControl.hasError('minLength');
  }
 
  getTipoServico() {
    return (this.servico.tipo || BANHO).id
  }

  insereServico() {
    this.adicionaServico.emit(this.servico);
  }

  cancelarOperacao() {
    this.cancelaOperacao.emit();
  }

  getTiposServico() {
    return this.servicos;
  }
  
  constructor(private servicoService:ServicosService) { }

  ngOnInit(): void {
    this.servicoService.getTipos().subscribe(servicos => {
      this.servicos = JSON.parse(servicos) || SERVICOS;
    },
    err => {
      this.servicos = SERVICOS;
    })
  }

 
 
}
