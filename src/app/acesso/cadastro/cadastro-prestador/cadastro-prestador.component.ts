import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroupDirective, NgForm, FormBuilder,FormGroup, Validators} from '../../../../../node_modules/@angular/forms';
import { Router } from '@angular/router';
import { LocalStorageService } from '../../../servicos/local-storage.service';
import { UsuarioService } from '../../../servicos/usuario.service';
import { PrestadorService } from '../../../servicos/prestador.service';
import { Prestador } from '../../../interfaces/prestador';
import { TipoPessoa } from '../../../enum/tipo-pessoa.enum';
import {MyErrorStateMatcher} from '../../../classes/my-error-state-matcher';
import { Estado, Cidade, ConsultaEstadosService } from 'src/app/servicos/consulta-estados.service';
import { LoginService } from 'src/app/servicos/login.service';
import { telefoneFormControl, cpfFormControl, nomeFormControl, emailFormControl, senhaFormControl } from 'src/app/util/form-controls';


@Component({
  selector: 'app-cadastro-prestador',
  templateUrl: './cadastro-prestador.component.html',
  styleUrls: ['./cadastro-prestador.component.scss']
})
export class CadastroPrestadorComponent implements OnInit {
  prestador:Prestador= {
    nome: "",
    foto: "",
    cpf: "",
    tipo:TipoPessoa.PRESTADOR_AUTONOMO,
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
    telefone: "",
    descricao: "",
    servicos:[]
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
 
    
  estados:Estado[] = [];
  cidades:Cidade[] = [] ;



  constructor(
    private loginService:LoginService,
    private consultaEstadoService:ConsultaEstadosService,
    private router:Router,
    private localStorageService: LocalStorageService,
    ) { }

  ngOnInit(): void {
    this.consultaEstadoService.getEstados().subscribe(el => {
      this.estados = el;
    })
  }

  repetirSenha(senha:string) {
    this.confirmarSenha = senha;
  }

  
  cadastrarPrestador(prestador:Prestador) {
    console.log(this.confirmarSenha, this.prestador.login.senha)
    if(this.confirmarSenha !== this.prestador.login.senha) { 
      this.errorMessage = 'MENSAGEM_ERRO_SENHA'; return; 
    }
    this.loginService.cadastrarUsuario(prestador)
      .subscribe(res => {
          this.router.navigate(['/login'])
        }, (err) => {
          console.log(err);
          this.errorMessage = "";
          this.erroRequisicao = typeof err === "string" ? err : "Erro durante a operação";
        });
  }

  hasErrors() {
    return this.telefoneFormControl.hasError('required') ||
    this.cpfFormControl.hasError('required') ||
    this.nomeFormControl.hasError('required') ||
    this.emailFormControl.hasError('required') || this.emailFormControl.hasError('email') ||
    this.senhaFormControl.hasError('required') || this.senhaFormControl.hasError('min') ||
    this.confirmaSenhaFormControl.hasError('required') ||  this.logradouroFormControl.hasError('required')  ||
    this.numeroFormControl.hasError('required') ||
    this.bairroFormControl.hasError('required')  ||
    this.cepFormControl.hasError('required') || this.estadoFormControl.hasError('required') || this.cidadeFormControl.hasError('required')
   }


   
  carregarCidades(uf:string) {
    this.consultaEstadoService.getCidades(uf).subscribe(el => {
      this.cidades = el;
    })
  }

}
