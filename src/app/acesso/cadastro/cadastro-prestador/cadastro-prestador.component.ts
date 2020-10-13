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

  emailFormControl = new FormControl('', [
    Validators.required,
    Validators.email,
  ]);

  enderecoFormControl = new FormControl('', [
    Validators.required
  ])

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
    private loginService:LoginService,
    private consultaEstadoService:ConsultaEstadosService,
    private router:Router,
    private localStorageService: LocalStorageService,
    ) { }

    senhaFormControl = new FormControl('', [Validators.required])
    confirmarSenhaFormControl = new FormControl('', [Validators.required])

  ngOnInit(): void {
    this.consultaEstadoService.getEstados().subscribe(el => {
      this.estados = el;
    })
  }

  cadastrarPrestador(prestador:Prestador) {
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
    return this.emailFormControl.hasError('email') || this.emailFormControl.hasError('required') || this.passwordFormControl.hasError('required') || this.enderecoFormControl.hasError('required');
  }
  carregarCidades(uf:string) {
    this.consultaEstadoService.getCidades(uf).subscribe(el => {
      this.cidades = el;
    })
  }

}
