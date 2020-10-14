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
import { telefoneFormControl, nomeFormControl, emailFormControl, senhaFormControl, cpfFormControl } from 'src/app/util/form-controls';

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
      email: null,
      senha: null
    },
    animaisEstimacao: [],
    telefone: ""
  };

  telefoneFormControl = telefoneFormControl;
  cpfFormControl = cpfFormControl;
  nomeFormControl = nomeFormControl;
  emailFormControl = emailFormControl;
  senhaFormControl = senhaFormControl;
  confirmaSenhaFormControl = new FormControl('', [
    Validators.required
  ]);
  logradouroFormControl = new FormControl('', [Validators.required]);
  numeroFormControl = new FormControl('', [Validators.required]);
  complementoFormControl = new FormControl('', [Validators.required]);
  bairroFormControl = new FormControl('', [Validators.required]);
  cepFormControl = new FormControl('', [Validators.required]);
  estadoFormControl = new FormControl('', [Validators.required]);
  cidadeFormControl = new FormControl('', [Validators.required]);
  
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

  ngOnInit(): void {
    this.consultaEstadoService.getEstados().subscribe(el => {
      this.estados = el;
    })
  }

  cadastrarCliente(cliente:Cliente) {
    
    if(this.confirmarSenha !== this.cliente.login.senha) { 
      console.log(this.confirmarSenha, this.cliente.login.senha);
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
  return this.telefoneFormControl.invalid || this.cpfFormControl.invalid || this.nomeFormControl.invalid || this.emailFormControl.invalid || this.senhaFormControl.invalid || this.confirmaSenhaFormControl.invalid || this.logradouroFormControl.invalid || this.numeroFormControl.invalid || this.bairroFormControl.invalid || this.cepFormControl.invalid
 }

 repetirSenha(senha:string) {
  this.confirmarSenha = senha;
}

}
