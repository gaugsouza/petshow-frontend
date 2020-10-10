import { Component, OnInit } from '@angular/core';
import { ServicoDetalhado } from '../interfaces/servico-detalhado';
import { Prestador } from '../interfaces/prestador';
import { PrestadorService } from '../servicos/prestador.service';
import { Router } from '@angular/router';
import { LocalStorageService } from '../servicos/local-storage.service';
import { USUARIO_TOKEN } from '../util/constantes';
import { Endereco } from '../interfaces/endereco';

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
              private router:Router,
              private localStorageService:LocalStorageService) { }

  ngOnInit(): void {
    this.getUsuario();
    this.limpaServico();
  }

  getUsuario() {
    this.localStorageService.getItem(USUARIO_TOKEN).subscribe((token:number) => {
      this.prestadorService.buscaPrestador(token)
      .subscribe((usuario:Prestador) => {
        console.log(usuario);
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
    this.prestadorService.editaPrestador(this.usuarioRequest.id, this.usuarioRequest).subscribe(res => {
      this.localStorageService.setItem(USUARIO_TOKEN, res.id).subscribe(() => {
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
    servico.prestador = this.usuario;
    console.log(servico);
    this.prestadorService.adicionarServico(this.usuario.id, servico).subscribe(() => {
      this.limpaServico();
      this.getUsuario();
      this.isFormVisivel = false;
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
    console.log()
    this.prestadorService.removeServico(this.usuario.id, servico.id).subscribe(()=> {
      this.getUsuario();
    });
  }
}
