import { Component, OnInit } from '@angular/core';
import { PrestadorService } from 'src/app/servicos/prestador.service';
import { Router, ActivatedRoute } from '@angular/router';
import { Prestador } from 'src/app/interfaces/prestador';
import { ServicoDetalhado } from 'src/app/interfaces/servico-detalhado';

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
  getMediaUsuario():string {

    if (!this.prestador.servicos || this.prestador.servicos.length === 0) {
      return (0).toFixed(2);
    }
    const somaMedias = this.prestador.servicos.reduce((soma:number, servico:ServicoDetalhado) => {
      soma += servico.mediaAvaliacao;
      return soma;
    }, 0);

    const resultado = (somaMedias / this.prestador.servicos.length).toFixed(2);
    
    // const qtdeAvaliacoes = this.prestador.servicos.reduce((total:number, servico:ServicoDetalhado) => {
    //   total += servico.avaliacoes.length;
    //   return total;
    // }, 0);

    if (resultado=="0.00") return "SEM_AVALIACOES";
    else return resultado;
  }
/* eslint-enable no-param-reassign */
}
