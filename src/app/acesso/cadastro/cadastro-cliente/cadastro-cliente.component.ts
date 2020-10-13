import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroupDirective, NgForm, FormBuilder,FormGroup, Validators} from '../../../../../node_modules/@angular/forms';
import { Router } from '@angular/router';
import { LocalStorageService } from '../../../servicos/local-storage.service';
import { UsuarioService } from '../../../servicos/usuario.service';
import { Cliente } from '../../../interfaces/cliente';
import { TipoPessoa } from '../../../enum/tipo-pessoa.enum';
import {MyErrorStateMatcher} from '../../../classes/my-error-state-matcher';
import { ConsultaEstadosService, Estado, Cidade } from 'src/app/servicos/consulta-estados.service';
import { LoginService } from 'src/app/servicos/login.service';
import { Validacoes } from 'src/app/validacoes';

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
    tipo:TipoPessoa.CLIENTE,
    endereco: {
      logradouro: "",
      cep: "",
      bairro: "",
      cidade: "",
      estado: "",
      numero: null,
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

  enderecoFormControl = new FormControl('', [
    Validators.required
  ]);

  passwordFormControl = new FormControl('', [
    Validators.required
  ]);

  erroRequisicao:String;
  submitted = false;
  isCliente:Boolean= false;
  isPrestador:Boolean= false;
  confirmarSenha:string = ""
  errorMessage : string = ""
  matcher = new MyErrorStateMatcher();
  
  estados:Estado[] = [];
  cidades:Cidade[] = [] ;


  constructor(
    private loginService:LoginService,
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
    this.loginService.cadastrarUsuario(cliente)
      .subscribe(res => {
          this.router.navigate(['/login'])
        }, (err) => {
          console.log(err);
          this.errorMessage = null;
          this.erroRequisicao = typeof err === "string" ? err : "Erro durante a operação";
        });
  }
  carregarCidades(uf:string) {
    this.consultaEstadoService.getCidades(uf).subscribe(el => {
      this.cidades = el;
    })
  }

  hasErrors() {
    return this.emailFormControl.hasError('email') || this.emailFormControl.hasError('required') || this.passwordFormControl.hasError('required') || this.enderecoFormControl.hasError('required');
  }

}
