import { Component, Input, OnInit } from '@angular/core';
import { FormControl, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { TipoPessoa } from 'src/app/enum/tipo-pessoa.enum';
import { Usuario } from 'src/app/interfaces/usuario';
import { Cidade, ConsultaEstadosService, Estado } from 'src/app/servicos/consulta-estados.service';
import { LoginService } from 'src/app/servicos/login.service';
import { cliente, prestador } from 'src/app/util/conta-model';
import {
  emailFormControl, nomeFormControl, senhaFormControl, telefoneFormControl,
} from 'src/app/util/form-controls';
import { MatDialog } from '@angular/material/dialog';
import { PoliticaPrivacidadeComponent } from 'src/app/acesso/cadastro/politica-privacidade/politica-privacidade.component';
import { ValidateBrService } from 'angular-validate-br';
import { Endereco } from 'src/app/interfaces/endereco';
import { Empresa } from 'src/app/interfaces/empresa';

@Component({
  selector: 'app-cadastro-conta',
  templateUrl: './cadastro-conta.component.html',
  styleUrls: ['./cadastro-conta.component.scss'],
})
export class CadastroContaComponent implements OnInit {
  @Input('tipo-conta') tipoConta:TipoPessoa;

  usuario:Usuario;

  disableSend:boolean = false;

  telefoneFormControl = telefoneFormControl;

  nomeFormControl = nomeFormControl;

  emailFormControl = emailFormControl;

  senhaFormControl = senhaFormControl;

  confirmaSenhaFormControl = new FormControl('', [
    Validators.required,
  ]);

  numeroFormControl = new FormControl('', [Validators.required]);

  cepFormControl = new FormControl('', [Validators.required, Validators.minLength(8)]);

  cpfFormControl:FormControl;

  erroRequisicao:string;

  submitted = false;

  confirmarSenha:string = '';

  errorMessage : string = '';

  estados:Estado[] = [];

  cidades:Cidade[] = [];

  isPoliticasAceitas:boolean=false;

  exibeFormEmpresa:boolean = false;

  empresa:Empresa;

  constructor(private loginService:LoginService,
              private consultaEstadoService:ConsultaEstadosService,
              private router:Router,
              private politica: MatDialog,
              private validateBrService:ValidateBrService) {
    this.cpfFormControl = new FormControl('', [
      Validators.required,
      this.validateBrService.cpf,
    ]);
  }

  ngOnInit(): void {
    this.usuario = this.isPrestador() ? prestador : cliente;
    this.consultaEstadoService.getEstados().subscribe((el) => {
      this.estados = el;
    });
  }

  carregarCidades(uf:string) {
    this.consultaEstadoService.getCidades(uf).subscribe((el) => {
      this.cidades = el;
    });
  }

  repetirSenha(senha:string) {
    this.confirmarSenha = senha;
  }

  hasErrors() {
    return this.telefoneFormControl.invalid
    || this.cpfFormControl.invalid
    || this.nomeFormControl.invalid
    || this.emailFormControl.invalid
    || this.senhaFormControl.invalid
    || this.confirmaSenhaFormControl.invalid
    || this.numeroFormControl.invalid
    || this.cepFormControl.invalid
    || !this.isPoliticasAceitas;
  }

  isPrestador() {
    return this.tipoConta === TipoPessoa.PRESTADOR_AUTONOMO;
  }

  isSenhasIguais() {
    return this.confirmarSenha === this.usuario.login.senha;
  }

  redirect(token?:string) {
    let tokenTrim = '';
    if (token) {
      tokenTrim = token.slice(0, token.length / 2);
    }
    this.router.navigate(['/cadastro-sucesso'], { queryParams: { token: tokenTrim } });
  }

  disableButton() {
    this.disableSend = !this.disableSend;
  }

  cadastrarUsuario(usuario:Usuario) {
    this.disableButton();
    this.loginService.cadastrarUsuario(usuario)
      .subscribe((res) => {
        this.redirect(res);
      }, (err) => {
        this.errorMessage = '';
        this.erroRequisicao = typeof err === 'string' ? err : 'ERRO_REQUISICAO';
        this.disableButton();
      });
  }

  setaEndereco(endereco:Endereco) {
    this.usuario.endereco = endereco;
  }

  toggleFormEmpresa() {
    this.exibeFormEmpresa = !this.exibeFormEmpresa;
  }

  cadastrarConta(usuario:Usuario) {
    if (!this.isSenhasIguais()) {
      this.errorMessage = 'MENSAGEM_ERRO_SENHA';
      return;
    }
    this.cadastrarUsuario(usuario);
  }

  openDialog() {
    const politicaRef = this.politica.open(PoliticaPrivacidadeComponent);
    politicaRef.afterClosed().subscribe((result) => {
      console.info(`Dialog result: ${result}`);
    });
  }

  toggleCheckBoxPoliticas() {
    this.isPoliticasAceitas = !this.isPoliticasAceitas;
  }

  alteraEmpresa(empresa:Empresa) {
    this.empresa = { ...empresa };
  }

}
