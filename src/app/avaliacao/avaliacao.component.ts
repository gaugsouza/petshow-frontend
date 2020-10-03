import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Params } from '@angular/router';
import { AvaliacaoService } from '../servicos/avaliacao.service';
import { ServicoDetalhado } from '../interfaces/servico-detalhado';
import { Router } from '@angular/router';
import { Avaliacao } from '../interfaces/avaliacao';
import { LocalStorageService } from '../servicos/local-storage.service';
import { Cliente } from '../interfaces/cliente';

@Component({
  selector: 'app-avaliacao',
  templateUrl: './avaliacao.component.html',
  styleUrls: ['./avaliacao.component.scss']
})
export class AvaliacaoComponent implements OnInit {
  servicoAvaliado:ServicoDetalhado;
  constructor(private route:ActivatedRoute,
              private avaliacaoService:AvaliacaoService,
              private router:Router,
              private localStorageService:LocalStorageService) {}

  ngOnInit(): void {
    this.route.queryParams.subscribe((params:Params) => {
      let id:number = parseInt(params.servicoAvaliado);
      this.avaliacaoService.buscaServicoAvaliadoPorId(id).subscribe(servico => {
        if(!servico) {
          this.router.navigate(['/']);
          return;
        }
        this.servicoAvaliado = servico;
      });
    });
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

  getMediaAvaliacoes() {
    if(this.getAvaliacoes().length === 0) {
      return 0;
    }
    return (this.getAvaliacoes().reduce((total, avaliacao) => total += avaliacao.media, 0) / this.getAvaliacoes().length).toFixed(2);
  }

  adicionaAvaliacao(avaliacao:Avaliacao) {
    let cliente;
    avaliacao.servicoAvaliado = this.servicoAvaliado;
    this.localStorageService.getItem('usuario').subscribe((usuario:Cliente) => {
      avaliacao.cliente = usuario;
      this.avaliacaoService.adicionarAvaliacao(avaliacao).subscribe(servico => {
        this.servicoAvaliado = servico;
      });
    });    
  }

}
