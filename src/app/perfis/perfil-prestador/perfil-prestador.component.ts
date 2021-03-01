import { Component, Inject, OnInit } from '@angular/core';
import { ServicoDetalhado } from 'src/app/interfaces/servico-detalhado';
import { Prestador } from 'src/app/interfaces/prestador';
import { PrestadorService } from 'src/app/servicos/prestador.service';
import { LocalStorageService } from 'src/app/servicos/local-storage.service';
import { USER_TOKEN } from 'src/app/util/constantes';
import { Endereco } from 'src/app/interfaces/endereco';
import { JwtHelper } from 'src/app/util/jwt-helper';
import { NotificationService } from 'src/app/servicos/notification.service';
import { ErrorDialogComponent } from 'src/app/confirmation-dialog/error-dialog.component';
import { MatDialog } from '@angular/material/dialog';
import { Empresa } from 'src/app/interfaces/empresa';
import { EmpresaService } from 'src/app/servicos/empresa.service';

@Component({
  selector: 'app-perfil-prestador',
  templateUrl: './perfil-prestador.component.html',
  styleUrls: ['./perfil-prestador.component.scss'],
})
export class PerfilPrestadorComponent implements OnInit {
  servico:ServicoDetalhado = {};

  usuario:Prestador;

  usuarioRequest:Prestador;

  isFormVisivel:Boolean = false;

  mensagemSucesso:string;

  constructor(private prestadorService:PrestadorService,
              private localStorageService:LocalStorageService,
              public dialog:MatDialog,
              private jwtHelper: JwtHelper,
              private empresaService:EmpresaService,
              @Inject('ServicoNotificationService') private servicoNotification: NotificationService<ServicoDetalhado>) { }

  ngOnInit(): void {
    this.getUsuario();
    this.limpaServico();
  }

  getUsuario() {
    this.localStorageService.getItem(USER_TOKEN).subscribe((token:string) => {
      const id = this.jwtHelper.recuperaIdToken(token);
      this.prestadorService.buscaPrestador(id, token)
        .subscribe((usuario:Prestador) => {
          this.usuario = usuario;
          console.log(this.usuario);
        },
        (err) => {
          this.handleError(err);
        });
    },
    (err) => {
      this.handleError(err);
    });
  }

  exibeFormulario() {
    this.mensagemSucesso = null;
    this.isFormVisivel = true;
  }

  atualizaUsuario() {
    this.localStorageService.getItem(USER_TOKEN).subscribe((token:string) => {
      this.prestadorService.editaPrestador(this.usuarioRequest.id, this.usuarioRequest, token)
        .subscribe(() => {
          this.getUsuario();
          this.limpaServico();
          this.ocultaFormulario();
          this.usuarioRequest = null;
          this.mensagemSucesso = 'Operação realizada com sucesso';
        },
        (err) => {
          this.handleError(err);
        });
    });
  }

  ocultaFormulario() {
    this.isFormVisivel = false;
  }

  handleError(err) {
    const data = {
      mensagem: typeof err === 'string' ? err : 'ERRO_REQUISICAO',
      textoBotao: 'Ok',
    };

    this.dialog.open(ErrorDialogComponent, {
      width: '400px',
      data: { ...data },
    });
  }

  adicionaServico({ ...servico }:ServicoDetalhado): void {
    this.localStorageService.getItem(USER_TOKEN).subscribe((token:string) => {
      const novoServico = { ...servico, prestador: this.usuario };
      this.prestadorService.adicionarServico(this.usuario.id, novoServico, token)
        .subscribe((el) => {
          this.limpaServico();
          this.getUsuario();
          this.isFormVisivel = false;
          this.servicoNotification.notify(el);
        },
        (err) => {
          this.handleError(err);
        });
    });
  }

  geraTitulo() {
    if (!this.usuario.empresa.id) {
      return this.usuario.nome;
    }

    return this.usuario.empresa.razaoSocial || this.usuario.empresa.nome;
  }

  geraSubtitulo() {
    return this.usuario.nome;
  }

  atualizaEndereco(endereco:Endereco):void {
    this.usuarioRequest = { ...this.usuario };
    this.usuarioRequest.endereco = endereco;
    this.atualizaUsuario();
  }

  atualizaEnderecoEmpresa(endereco:Endereco):void {
    const empresa  = { ...this.usuario.empresa, endereco };
    this.atualizaEmpresa(empresa);
  }

  atualizaEmpresa(empresa:Empresa):void {
    this.localStorageService.getItem(USER_TOKEN).subscribe((token:string) => {
      this.empresaService.atualizaEmpresa(empresa, token)
      .subscribe(() => {
        this.getUsuario();
      })
    });
  }


  alteraTelefone(telefone:string):void {
    this.usuarioRequest = { ...this.usuario };
    this.usuarioRequest.telefone = telefone;
    this.atualizaUsuario();
  }

  cancelar() {
    this.isFormVisivel = false;
    this.limpaServico();
  }

  limpaServico() {
    this.servico = {};
  }

  removeServico(servico:ServicoDetalhado) {
    this.localStorageService.getItem(USER_TOKEN).subscribe((token:string) => {
      this.prestadorService.removeServico(this.usuario.id, servico.id, token).subscribe(() => {
        this.getUsuario();
        this.servicoNotification.notify({});
      });
    },
    (err) => {
      this.handleError(err);
    });
  }
}
