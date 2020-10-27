import { Component, OnInit } from '@angular/core';
import { ServicoDetalhado } from 'src/app/interfaces/servico-detalhado';
import { Prestador } from 'src/app/interfaces/prestador';
import { PrestadorService } from 'src/app/servicos/prestador.service';
import { LocalStorageService } from 'src/app/servicos/local-storage.service';
import { USER_TOKEN } from 'src/app/util/constantes';
import { Endereco } from 'src/app/interfaces/endereco';
import { JwtHelper } from 'src/app/util/jwt-helper';

@Component({
  selector: 'app-perfil-prestador',
  templateUrl: './perfil-prestador.component.html',
  styleUrls: ['./perfil-prestador.component.scss']
})
export class PerfilPrestadorComponent implements OnInit {
  servico:ServicoDetalhado = {}
  usuario:Prestador;
  usuarioRequest:Prestador;
  isFormVisivel:Boolean = false;
  erroRequisicao:String;
  mensagemSucesso:String;

  constructor(private prestadorService:PrestadorService,
              private localStorageService:LocalStorageService,
              private jwtHelper: JwtHelper) { }

  ngOnInit(): void {
    this.getUsuario();
    this.limpaServico();
  }

  getUsuario() {
    this.localStorageService.getItem(USER_TOKEN).subscribe((token:string) => {
      let id = this.jwtHelper.recuperaIdToken(token);
      this.prestadorService.buscaPrestador(id, token)
      .subscribe((usuario:Prestador) => {
        this.usuario = usuario;
      })
    })
  }

  exibeFormulario() {
    this.erroRequisicao = null;
    this.mensagemSucesso = null;
    this.isFormVisivel = true;
  }

  atualizaUsuario() {
    this.localStorageService.getItem(USER_TOKEN).subscribe((token:string) => {
      this.prestadorService.editaPrestador(this.usuarioRequest.id, this.usuarioRequest, token).subscribe(res => {
        this.getUsuario();
        this.limpaServico();
        this.ocultaFormulario();
        this.usuarioRequest = null;
        this.mensagemSucesso = "Operação realizada com sucesso"
      })
    })
  }

  ocultaFormulario() {
    this.isFormVisivel = false;
  }


  adicionaServico({...servico}:ServicoDetalhado): void {
    this.localStorageService.getItem(USER_TOKEN).subscribe((token:string) => {
      servico.prestador = this.usuario;
      this.prestadorService.adicionarServico(this.usuario.id, servico, token).subscribe(() => {
        this.limpaServico();
        this.getUsuario();
        this.isFormVisivel = false;
      })
    })
  }

  atualizaEndereco(endereco:Endereco):void {
    this.usuarioRequest = {...this.usuario};
    this.usuarioRequest.endereco = endereco;
    this.atualizaUsuario();
  }

  alteraTelefone(telefone:string):void {
    this.usuarioRequest = {...this.usuario};
    this.usuarioRequest.telefone = telefone;
    this.atualizaUsuario();
  }

  cancelar() {
    this.isFormVisivel = false;
    this.limpaServico();
  }

  limpaServico() {
    this.servico = {}
  }
  
  removeServico(servico:ServicoDetalhado) {
    this.localStorageService.getItem(USER_TOKEN).subscribe((token:string) => {
      this.prestadorService.removeServico(this.usuario.id, servico.id, token).subscribe(()=> {
        this.getUsuario();
      });
    })
  }
}
