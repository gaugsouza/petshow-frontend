import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Params } from '@angular/router';
import { AvaliacaoService } from 'src/app/servicos/avaliacao.service';
import { ServicoDetalhado } from 'src/app/interfaces/servico-detalhado';
import { Router } from '@angular/router';
import { Avaliacao } from 'src/app/interfaces/avaliacao';
import { LocalStorageService } from 'src/app/servicos/local-storage.service';
import { Cliente } from 'src/app/interfaces/cliente';
import { USER_TOKEN } from 'src/app/util/constantes';
import { UsuarioService } from 'src/app/servicos/usuario.service';
import { TipoPessoa } from 'src/app/enum/tipo-pessoa.enum';
import { PrestadorService } from 'src/app/servicos/prestador.service';
import { servicos } from 'src/app/mocks/servico-detalhado-mock';
import { DataSharingService } from 'src/app/servicos/data-sharing.service';

@Component({
  selector: 'app-avaliacao',
  templateUrl: './avaliacao.component.html',
  styleUrls: ['./avaliacao.component.scss']
})
export class AvaliacaoComponent implements OnInit {
  isLogado:boolean = false;
  isFormVisible:boolean = false;
  servicoAvaliado:ServicoDetalhado;
  idPrestador:number;
  idServico:number;
  isNotFound:boolean = false;
  isCliente:boolean = false;
  avaliacaoBase:Avaliacao = {
    atencao:0,
    qualidadeProdutos:0,
    custoBeneficio:0,
    infraestrutura:0,
    qualidadeServico:0,
    comentario: null
  }


  constructor(private route:ActivatedRoute,
              private avaliacaoService:AvaliacaoService,
              private router:Router,
              private localStorageService:LocalStorageService,
              private usuarioService:UsuarioService,
              private prestadorService:PrestadorService,
              private dataSharing: DataSharingService) {}

  ngOnInit(): void {
    this.route.queryParams.subscribe((params:Params) => {
      this.idServico = parseInt(params.servicoAvaliado);
      this.idPrestador = parseInt(params.prestador);
      if(isNaN(this.idServico) || isNaN(this.idPrestador)) {
        this.router.navigate(['/']);
        return;
      }
      this.preencheServico(this.idServico, this.idPrestador);
    });
    this.dataSharing.isUsuarioLogado.subscribe(isLogado => {
      this.isLogado = isLogado;
      if(!this.isLogado) {
        return;
      }

      this.localStorageService.getItem(USER_TOKEN).subscribe((token:string) => {
        if(!token) {
          return;
        }
        this.usuarioService.getUsuario(token).subscribe(usuario => {
          this.isCliente = usuario.tipo === TipoPessoa.CLIENTE || usuario.tipo == 1;
        }, err => {
          console.log(err);
          this.isCliente = false;
        })
      });
    });
    // this.localStorageService.getItem(USER_TOKEN).subscribe((token:string) => {
    //   if(token){
    //     this.usuarioService.getUsuario(token).subscribe(usuario => {
    //       this.isLogado = !!(usuario);
    //       if(this.isLogado) {
    //         this.isCliente = usuario.tipo === TipoPessoa.CLIENTE || usuario.tipo == 1;
    //       }
    //     })
    //   }      
    // })
  }


  preencheServico(idPrestador, idServico) {
    this.avaliacaoService.buscaServicoAvaliadoPorId(idPrestador, idServico).subscribe(servico => {
      if(!servico) {
        this.isNotFound = true;
        return;
      }
      this.prestadorService.buscaPrestador(servico.prestadorId).subscribe(prestador => {
        servico.prestador = prestador;
        servico.avaliacoes.forEach(avaliacao => {
          this.usuarioService.buscarUsuario(avaliacao.clienteId).subscribe(cliente => {
            avaliacao.cliente = cliente;
          })
        })
        
        this.servicoAvaliado = servico;
      })
      
    });
  }
  exibeForm() {
    this.isFormVisible = true;
  }

  getNomeServico() {
    return this.servicoAvaliado.tipo.nome;
  }

  getNomePrestador() {
    return this.servicoAvaliado.prestador.nome;
  }

  getAvaliacoes() {
    return this.servicoAvaliado.avaliacoes;
  }

  possuiAvaliacoes() {
    return !!(this.getAvaliacoes()) && this.getAvaliacoes().length > 0;
  }

  getMediaAvaliacoes() {
    if(this.getAvaliacoes().length === 0) {
      return 0;
    }
    return (this.getAvaliacoes().reduce((total, avaliacao) => total += avaliacao.media, 0) / this.getAvaliacoes().length).toFixed(2);
  }

  adicionaAvaliacao(avaliacao:Avaliacao) {
    avaliacao.servicoAvaliado = this.servicoAvaliado;
    this.localStorageService.getItem(USER_TOKEN)
    .subscribe((token:string) => {
      this.usuarioService.getUsuario(token)
      .subscribe((cliente:Cliente) => {
        avaliacao.clienteId = cliente.id;
        this.avaliacaoService.adicionarAvaliacao(avaliacao, this.idServico, this.idPrestador, token).subscribe(servico => {
          this.preencheServico(this.idServico, this.idPrestador);
          this.fechaFormulario();
          this.limpaAvaliacao();
        });
      });
    }); 
  }

  abreFormulario() {
    this.isFormVisible = true;
  }

  fechaFormulario() {
    this.limpaAvaliacao();
    this.isFormVisible = false;
  }

  limpaAvaliacao() {
    this.avaliacaoBase = {
      atencao:0,
      qualidadeProdutos:0,
      custoBeneficio:0,
      infraestrutura:0,
      qualidadeServico:0,
      comentario: null
    }
  }

}
