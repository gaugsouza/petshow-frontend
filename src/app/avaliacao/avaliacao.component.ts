import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Params } from '@angular/router';
import { AvaliacaoService } from '../servicos/avaliacao.service';
import { ServicoDetalhado } from '../interfaces/servico-detalhado';
import { Router } from '@angular/router';
import { Avaliacao } from '../interfaces/avaliacao';
import { LocalStorageService } from '../servicos/local-storage.service';
import { Cliente } from '../interfaces/cliente';
import { USUARIO_TOKEN } from '../util/constantes';

@Component({
  selector: 'app-avaliacao',
  templateUrl: './avaliacao.component.html',
  styleUrls: ['./avaliacao.component.scss']
})
export class AvaliacaoComponent implements OnInit {
  isLogado:boolean = false;
  isFormVisible:boolean = false;
  servicoAvaliado:ServicoDetalhado;
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
              private localStorageService:LocalStorageService) {}

  ngOnInit(): void {
    this.route.queryParams.subscribe((params:Params) => {
      let idServico:number = parseInt(params.servicoAvaliado);
      let idPrestador:number = parseInt(params.prestador);
      console.log(idServico, idPrestador)
      if(isNaN(idServico)|| isNaN(idPrestador)) {
        this.router.navigate(['/']);
        return;
      }
      this.avaliacaoService.buscaServicoAvaliadoPorId(idServico,idPrestador).subscribe(servico => {
        if(!servico) {
          this.router.navigate(['/']);
          return;
        }
        this.servicoAvaliado = servico;
      });
    });

    this.localStorageService.getItem(USUARIO_TOKEN).subscribe(usuario => {
      this.isLogado = !!(usuario);
    })
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
    this.localStorageService.getItem(USUARIO_TOKEN).subscribe((usuario:Cliente) => {
      avaliacao.cliente = usuario;
      this.avaliacaoService.adicionarAvaliacao(avaliacao).subscribe(servico => {
        this.servicoAvaliado = servico;
        this.isFormVisible = false;
        this.limpaAvaliacao();
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
