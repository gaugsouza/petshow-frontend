import { Component, OnInit } from '@angular/core';
import { PrestadorService } from '../servicos/prestador.service';
import { Router, ActivatedRoute } from '@angular/router';
import { Prestador } from '../interfaces/prestador';
import { ServicoDetalhado } from '../interfaces/servico-detalhado';
import { Avaliacao } from '../interfaces/avaliacao';
import { LocalStorageService } from '../servicos/local-storage.service';
import { USER_TOKEN } from '../util/constantes';

@Component({
  selector: 'app-prestador',
  templateUrl: './prestador.component.html',
  styleUrls: ['./prestador.component.scss']
})
export class PrestadorComponent implements OnInit {
  prestador:Prestador;
  carregado:boolean = false;
  constructor(private route:ActivatedRoute,
    private router:Router,
    private prestadorService:PrestadorService,
    private localStorageService:LocalStorageService) { }

  ngOnInit(): void {
    this.route.queryParams.subscribe(params => {
      let idPrestador:number = parseInt(params.idPrestador);
      console.log(idPrestador)
      if(isNaN(idPrestador)) {
        this.router.navigate(['/']);
        return;
      }
      this.prestadorService.buscaPrestador(idPrestador).subscribe(prestador => {
        this.carregado = true;
        this.prestador = prestador;
        console.log(this.prestador);
      });
    })
  }

  getMediaAvaliacoes(servicoDetalhado:ServicoDetalhado):number {
    if(!servicoDetalhado.avaliacoes || servicoDetalhado.avaliacoes.length === 0) {
      return 0;
    }

    let soma = servicoDetalhado.avaliacoes.reduce((soma:number, avaliacao:Avaliacao) => soma += avaliacao.media, 0);

    return soma / servicoDetalhado.avaliacoes.length;
  }

  getMediaUsuario():number {
    if(!this.prestador.servicos || this.prestador.servicos.length === 0) {
      return 0;
    }
    let somaMedias = this.prestador.servicos.reduce((soma:number, servico:ServicoDetalhado) => soma += this.getMediaAvaliacoes(servico), 0);

    return somaMedias / this.prestador.servicos.length
  }

}
