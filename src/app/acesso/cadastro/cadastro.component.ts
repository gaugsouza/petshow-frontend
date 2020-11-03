import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { TipoPessoa } from 'src/app/enum/tipo-pessoa.enum';
import { LocalStorageService } from '../../servicos/local-storage.service';
import { UsuarioService } from '../../servicos/usuario.service';

@Component({
  selector: 'app-cadastro',
  templateUrl: './cadastro.component.html',
  styleUrls: ['./cadastro.component.scss']
})
export class CadastroComponent implements OnInit {
  tipoConta:TipoPessoa;

  erroRequisicao:String;
  submitted = false;
  isCliente:Boolean= false;
  isPrestador:Boolean= false;

  constructor() { }

  ngOnInit(): void {
  
  }

  exibirFormCliente(){
    this.tipoConta = TipoPessoa.CLIENTE;
    this.isPrestador = false;
    this.isCliente=true;
  }

  exibirFormPrestador(){
    this.tipoConta = TipoPessoa.PRESTADOR_AUTONOMO;
    this.isCliente = false;
    this.isPrestador=true;
  }
  
}