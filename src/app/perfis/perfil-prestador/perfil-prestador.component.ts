import { Component, Inject, OnInit } from '@angular/core';
import { ServicoDetalhado } from 'src/app/interfaces/servico-detalhado';
import { Prestador } from 'src/app/interfaces/prestador';
import { PrestadorService } from 'src/app/servicos/prestador.service';
import { LocalStorageService } from 'src/app/servicos/local-storage.service';
import { USER_TOKEN } from 'src/app/util/constantes';
import { Endereco } from 'src/app/interfaces/endereco';
import { JwtHelper } from 'src/app/util/jwt-helper';
import { NotificationService } from 'src/app/servicos/notification.service';
import { BANHO } from 'src/app/util/tipo-servico';

@Component({
  selector: 'app-perfil-prestador',
  templateUrl: './perfil-prestador.component.html',
  styleUrls: ['./perfil-prestador.component.scss'],
})
export class PerfilPrestadorComponent implements OnInit {
  servico:ServicoDetalhado = {
    tipo: BANHO,
    animaisAceitos: [
      { id: 1, nome: 'Gato' },
      {
        id: 2, nome: 'Cachorro', porte: 'Pequeno', pelagem: 'Curta',
      },
    ],
    precoPorTipo: [{ id: 1, tipoAnimal: { id: 1, nome: 'Gato' }, preco: 0 },
      {
        id: 2,
        tipoAnimal: {
          id: 2, nome: 'Cachorro', porte: 'Pequeno', pelagem: 'Curta',
        },
        preco: 0,
      },
      {
        id: 3,
        tipoAnimal: {
          id: 3, nome: 'Cachorro', porte: 'Pequeno', pelagem: 'Média',
        },
        preco: 0,
      },
      {
        id: 4,
        tipoAnimal: {
          id: 4, nome: 'Cachorro', porte: 'Pequeno', pelagem: 'Longa',
        },
        preco: 0,
      },
      {
        id: 5,
        tipoAnimal: {
          id: 5, nome: 'Cachorro', porte: 'Médio', pelagem: 'Curta',
        },
        preco: 0,
      },
      {
        id: 6,
        tipoAnimal: {
          id: 6, nome: 'Cachorro', porte: 'Médio', pelagem: 'Média',
        },
        preco: 0,
      },
      {
        id: 7,
        tipoAnimal: {
          id: 7, nome: 'Cachorro', porte: 'Médio', pelagem: 'Longa',
        },
        preco: 0,
      },
      {
        id: 8,
        tipoAnimal: {
          id: 8, nome: 'Cachorro', porte: 'Grande', pelagem: 'Curta',
        },
        preco: 0,
      },
      {
        id: 9,
        tipoAnimal: {
          id: 9, nome: 'Cachorro', porte: 'Grande', pelagem: 'Média',
        },
        preco: 0,
      },
      {
        id: 10,
        tipoAnimal: {
          id: 10, nome: 'Cachorro', porte: 'Grande', pelagem: 'Longa',
        },
        preco: 0,
      },
    ],
  };

  usuario:Prestador;

  usuarioRequest:Prestador;

  isFormVisivel:Boolean = false;

  erroRequisicao:string;

  mensagemSucesso:string;

  constructor(private prestadorService:PrestadorService,
              private localStorageService:LocalStorageService,
              private jwtHelper: JwtHelper,
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
    this.erroRequisicao = null;
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
    this.erroRequisicao = typeof err === 'string' ? err : 'ERRO_REQUISICAO';
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

  atualizaEndereco(endereco:Endereco):void {
    this.usuarioRequest = { ...this.usuario };
    this.usuarioRequest.endereco = endereco;
    this.atualizaUsuario();
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
    this.servico = {
      tipo: BANHO,
      animaisAceitos: [
        { id: 1, nome: 'Gato' },
        {
          id: 2, nome: 'Cachorro', porte: 'Pequeno', pelagem: 'Curta',
        },
      ],
      precoPorTipo: [{ id: 1, tipoAnimal: { id: 1, nome: 'Gato' }, preco: 0 },
        {
          id: 2,
          tipoAnimal: {
            id: 2, nome: 'Cachorro', porte: 'Pequeno', pelagem: 'Curta',
          },
          preco: 0,
        },
        {
          id: 3,
          tipoAnimal: {
            id: 3, nome: 'Cachorro', porte: 'Pequeno', pelagem: 'Média',
          },
          preco: 0,
        },
        {
          id: 4,
          tipoAnimal: {
            id: 4, nome: 'Cachorro', porte: 'Pequeno', pelagem: 'Longa',
          },
          preco: 0,
        },
        {
          id: 5,
          tipoAnimal: {
            id: 5, nome: 'Cachorro', porte: 'Médio', pelagem: 'Curta',
          },
          preco: 0,
        },
        {
          id: 6,
          tipoAnimal: {
            id: 6, nome: 'Cachorro', porte: 'Médio', pelagem: 'Média',
          },
          preco: 0,
        },
        {
          id: 7,
          tipoAnimal: {
            id: 7, nome: 'Cachorro', porte: 'Médio', pelagem: 'Longa',
          },
          preco: 0,
        },
        {
          id: 8,
          tipoAnimal: {
            id: 8, nome: 'Cachorro', porte: 'Grande', pelagem: 'Curta',
          },
          preco: 0,
        },
        {
          id: 9,
          tipoAnimal: {
            id: 9, nome: 'Cachorro', porte: 'Grande', pelagem: 'Média',
          },
          preco: 0,
        },
        {
          id: 10,
          tipoAnimal: {
            id: 10, nome: 'Cachorro', porte: 'Grande', pelagem: 'Longa',
          },
          preco: 0,
        },
      ],
    };
  }

  removeServico(servico:ServicoDetalhado) {
    this.localStorageService.getItem(USER_TOKEN).subscribe((token:string) => {
      this.prestadorService.removeServico(this.usuario.id, servico.id, token).subscribe(() => {
        this.getUsuario();
      });
    },
    (err) => {
      this.handleError(err);
    });
  }
}
