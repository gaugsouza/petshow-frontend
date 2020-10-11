import { Component, OnInit } from '@angular/core';
import { FormBuilder,FormGroup, Validators} from '../../../../node_modules/@angular/forms';
import { Router } from '@angular/router';
import { LocalStorageService } from '../../servicos/local-storage.service';
import { UsuarioService } from '../../servicos/usuario.service';
import { Cliente } from '../../interfaces/cliente';
import { Prestador } from '../../interfaces/prestador';

@Component({
  selector: 'app-cadastro',
  templateUrl: './cadastro.component.html',
  styleUrls: ['./cadastro.component.scss']
})
export class CadastroComponent implements OnInit {

  erroRequisicao:String;
  submitted = false;
  isCliente:Boolean= false;
  isPrestador:Boolean= false;

  constructor(
    private usuarioService:UsuarioService,
    
    private router:Router,
    private localStorageService: LocalStorageService,
    ) { }

  ngOnInit(): void {
  
  }

  exibirFormCliente(){
    this.isCliente=true;
  }

  exibirFormPrestador(){
    this.isPrestador=true;
  }
  

}
