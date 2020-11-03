import { Component, Input, OnInit } from '@angular/core';
import { FormControl, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { TipoPessoa } from 'src/app/enum/tipo-pessoa.enum';
import { Usuario } from 'src/app/interfaces/usuario';
import { Cidade, ConsultaEstadosService, Estado } from 'src/app/servicos/consulta-estados.service';
import { LoginService } from 'src/app/servicos/login.service';
import { cliente, prestador } from 'src/app/util/conta-model';
import { cpfFormControl, emailFormControl, nomeFormControl, senhaFormControl, telefoneFormControl } from 'src/app/util/form-controls';

@Component({
  selector: 'app-cadastro-conta',
  templateUrl: './cadastro-conta.component.html',
  styleUrls: ['./cadastro-conta.component.scss']
})
export class CadastroContaComponent implements OnInit {
  @Input('tipo-conta') tipoConta:TipoPessoa;
  usuario:Usuario;

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

  erroRequisicao:string;
  submitted = false;

  confirmarSenha:string = "";
  errorMessage : string = "";

  estados:Estado[] = [];
  cidades:Cidade[] = [];


  constructor(private loginService:LoginService,
              private consultaEstadoService:ConsultaEstadosService,
              private router:Router) { }

  ngOnInit(): void {
    this.usuario = this.isPrestador() ? prestador : cliente;
    this.consultaEstadoService.getEstados().subscribe(el => {
      this.estados = el;
    });
  }

  carregarCidades(uf:string) {
    this.consultaEstadoService.getCidades(uf).subscribe(el => {
      this.cidades = el;
    })
  }

  repetirSenha(senha:string) {
    this.confirmarSenha = senha;
  }

  hasErrors() {
    return this.telefoneFormControl.invalid || this.cpfFormControl.invalid || this.nomeFormControl.invalid || this.emailFormControl.invalid || this.senhaFormControl.invalid || this.confirmaSenhaFormControl.invalid || this.logradouroFormControl.invalid || this.numeroFormControl.invalid || this.bairroFormControl.invalid || this.cepFormControl.invalid
   }

  isPrestador() {
    return this.tipoConta === TipoPessoa.PRESTADOR_AUTONOMO;
  }

  isSenhasIguais() {
    return this.confirmarSenha === this.usuario.login.senha;
  }
  redirect() {
    this.router.navigate(['/login'])
  }

  cadastrarUsuario(usuario:Usuario) {
    this.loginService.cadastrarUsuario(usuario)
    .subscribe(res => {
        this.redirect();
      }, (err) => {
        console.log(err);
        this.errorMessage = "";
        this.erroRequisicao = typeof err === "string" ? err : "ERRO_REQUISICAO";
      });
  }
  cadastrarConta(usuario:Usuario) {
    if(!this.isSenhasIguais()) { 
      this.errorMessage = 'MENSAGEM_ERRO_SENHA'; return; 
    }
    this.cadastrarUsuario(usuario);
  }
}
