import { Component, OnInit } from '@angular/core';
import { PrestadorService } from 'src/app/servicos/prestador.service';
import { Router, ActivatedRoute } from '@angular/router';
import { Prestador } from 'src/app/interfaces/prestador';
import { ServicoDetalhado } from 'src/app/interfaces/servico-detalhado';
import { Avaliacao } from 'src/app/interfaces/avaliacao';

@Component({
  selector: 'app-prestador',
  templateUrl: './prestador.component.html',
  styleUrls: ['./prestador.component.scss'],
})
export class PrestadorComponent implements OnInit {
  prestador:Prestador;

  carregado:boolean = false;

  constructor(private route:ActivatedRoute,
    private router:Router,
    private prestadorService:PrestadorService) { }

  ngOnInit(): void {
    const idPrestador:number = +this.route.snapshot.paramMap.get('id');
    if (!idPrestador || Number.isNaN(idPrestador)) {
      this.router.navigate(['/']);
      return;
    }

    this.prestadorService.buscaPrestador(idPrestador)
      .subscribe((prestador) => {
        this.carregado = true;
        this.prestador = JSON.parse(prestador);
      });
  }

  /* eslint-disable no-param-reassign */
  getMediaAvaliacoes = (servicoDetalhado:ServicoDetalhado):number => {
    if (!servicoDetalhado.avaliacoes || servicoDetalhado.avaliacoes.length === 0) {
      return 0;
    }

    const soma = servicoDetalhado.avaliacoes.reduce(
      (somaAvaliacoes:number, avaliacao:Avaliacao) => {
        somaAvaliacoes += avaliacao.media;
        return somaAvaliacoes;
      }, 0,
    );

    return soma / servicoDetalhado.avaliacoes.length;
  }

  getMediaUsuario():number {
    if (!this.prestador.servicos || this.prestador.servicos.length === 0) {
      return 0;
    }
    const somaMedias = this.prestador.servicos.reduce((soma:number, servico:ServicoDetalhado) => {
      soma += this.getMediaAvaliacoes(servico);
      return soma;
    }, 0);
    return somaMedias / this.prestador.servicos.length;
  }
/* eslint-enable no-param-reassign */
}
