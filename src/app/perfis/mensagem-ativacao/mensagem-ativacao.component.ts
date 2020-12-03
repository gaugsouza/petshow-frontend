import { Component, Input, OnInit } from '@angular/core';
import { Usuario } from 'src/app/interfaces/usuario';
import { ViewEncapsulation } from '@angular/core'
import { LocalStorageService } from 'src/app/servicos/local-storage.service';
import { LoginService } from 'src/app/servicos/login.service';
import { USER_TOKEN } from 'src/app/util/constantes';
@Component({
  selector: 'app-mensagem-ativacao',
  templateUrl: './mensagem-ativacao.component.html',
  styleUrls: ['./mensagem-ativacao.component.scss'],
  encapsulation: ViewEncapsulation.None
})
export class MensagemAtivacaoComponent implements OnInit {
  @Input('usuario') usuario:Usuario;
  hideMessage:boolean = false;
  mensagem:string;
  showRequestMessage:boolean = false;
  constructor(private loginService:LoginService) { }

  ngOnInit(): void {
  }

  enviaSolicitacao() {
    this.hideMessage = true;
    this.loginService.reenviaAtivacao(this.usuario.login.email)
      .subscribe(() => {
        this.mensagem = 'SOLICITACAO_REENVIADA';
        this.showRequestMessage = true;
      },
      () => {
        this.mensagem = 'ERRO_REENVIO_SOLICITACAO';
        this.showRequestMessage = true;
      });
  }

}
