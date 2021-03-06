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
        this.prestador.servicos = this.prestador.servicos.filter((servico) => servico.ativo);
      });
  }

  getTitulo() {
    if (!this.prestador.empresa) {
      return this.prestador.nome;
    }

    return this.prestador.empresa.razaoSocial || this.prestador.empresa.nome;
  }

  /* eslint-disable no-param-reassign */
  getMediaUsuario():string {
    if (!this.prestador.servicos || this.prestador.servicos.length === 0) {
      return 'SEM_AVALIACOES';
    }
    const somaMedias = this.prestador.servicos.reduce((soma:number, servico:ServicoDetalhado) => {
      soma += servico.mediaAvaliacao;
      return soma;
    }, 0);

    let servicosAtivosAvaliacao = 0;

    this.prestador.servicos.forEach((servico) => {
      servicosAtivosAvaliacao += (servico.ativo && servico.mediaAvaliacao) ? 1 : 0;
    });

    const resultado = (somaMedias / servicosAtivosAvaliacao).toFixed(2);
    if (!resultado) return 'SEM_AVALIACOES';
    return resultado;
  }
/* eslint-enable no-param-reassign */
}
