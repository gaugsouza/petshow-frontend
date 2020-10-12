import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroupDirective, NgForm, FormBuilder,FormGroup, Validators} from '../../../../../node_modules/@angular/forms';
import { Router } from '@angular/router';
import { LocalStorageService } from '../../../servicos/local-storage.service';
import { UsuarioService } from '../../../servicos/usuario.service';
import { Cliente } from '../../../interfaces/cliente';
import { TipoPessoa } from '../../../enum/tipo-pessoa.enum';
import {MyErrorStateMatcher} from '../../../classes/my-error-state-matcher';
import { ConsultaEstadosService, Estado, Cidade } from 'src/app/servicos/consulta-estados.service';

@Component({
  selector: 'app-cadastro-cliente',
  templateUrl: './cadastro-cliente.component.html',
  styleUrls: ['./cadastro-cliente.component.scss']
})
export class CadastroClienteComponent implements OnInit {
  cliente:Cliente= {
    nome: "",
    foto: "",
    cpf: "",
    tipo:null,
    endereco: {
      logradouro: "",
      cep: "",
      bairro: "",
      cidade: "",
      estado: "",
      numero: 0,
      complemento: ""
    },
    login: {
      email: "",
      senha: ""
    },
    animaisEstimacao: [],
    telefone: ""
  };

  emailFormControl = new FormControl('', [
    Validators.required,
    Validators.email,
  ]);

  erroRequisicao:String;
  submitted = false;
  isCliente:Boolean= false;
  isPrestador:Boolean= false;
  confirmarSenha:string = ""
  errorMessage : string = ""
  passwordFormControl = new FormControl('', [
    Validators.required
  ]);
  matcher = new MyErrorStateMatcher();
  
  estados:Estado[] = [];
  cidades:Cidade[] = [] ;


  constructor(
    private usuarioService:UsuarioService,
    private router:Router,
    private localStorageService: LocalStorageService,
    private consultaEstadoService:ConsultaEstadosService
    ) { }

    senhaFormControl = new FormControl('', [Validators.required])
    confirmarSenhaFormControl = new FormControl('', [Validators.required])

  ngOnInit(): void {
    this.consultaEstadoService.getEstados().subscribe(el => {
      this.estados = el;
    })
  }

  cadastrarCliente(cliente:Cliente) {
    if(this.confirmarSenha !== this.cliente.login.senha) { 
      this.errorMessage = 'MENSAGEM_ERRO_SENHA'; return; 
    }
    this.usuarioService.cadastrarUsuario(cliente)
      .subscribe(res => {
          this.router.navigate(['/login'])
        }, (err) => {
          console.log(err);
          this.erroRequisicao = "Erro durante a operação";
        });
  }
  carregarCidades(uf:string) {
    this.consultaEstadoService.getCidades(uf).subscribe(el => {
      this.cidades = el;
    })
  }

  hasErrors() {
    return this.emailFormControl.hasError('email') || this.emailFormControl.hasError('required') || this.passwordFormControl.hasError('required');
  }

}