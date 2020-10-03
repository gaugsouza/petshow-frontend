import { Component, OnInit } from '@angular/core';
import { PrestadorService } from '../servicos/prestador.service';
import { Prestador } from '../interfaces/prestador';
import { TipoAnimal } from '../enum/TipoAnimal';
import { Router } from '@angular/router';
import { LocalStorageService } from '../servicos/local-storage.service';


@Component({
  selector: 'app-prestador-servico',
  templateUrl: './prestador-servico.component.html',
  styleUrls: ['./prestador-servico.component.scss']
})
export class PrestadorServicoComponent implements OnInit {

  prestador:Prestador;
  erroRequisicao:String;

  constructor(private prestadorService:PrestadorService,
              private router:Router,
              private localStorageService: LocalStorageService) { }

  ngOnInit(): void { // mostra tudo automaticamente quando inicia a pagina
  }

  // getPrestador(id:number) : void { //pesquisar por id do prestador no back: buscarPrestador
  //   this.prestadorService.getPrestador(id)
  //   .subscribe((prestador:Prestador) => {
  //     if(!prestador) {
  //       this.router.navigate(['/prestador']);
  //       return;
  //     }
  //     this.prestador = prestador
  //   });
  // }

  criarPrestador(prestador:Prestador) { //
    this.prestadorService.criaPrestador(prestador)
      .subscribe(res => {
          const id = res['_id'];
          this.router.navigate(['/prestador', id]);
        }, (err) => {
          console.log(err);
          this.erroRequisicao = "Erro durante a operação";
        });
  }

  // deletaPrestador(id: number) {
  //   this.prestadorService.deletaPrestador(id)
  //     .subscribe(
  //       data => {
  //         console.log(data);
  //         this.
  //       });
  //       ,
  //   ({error}) => {
  //     console.log(error);
  //     this.erroRequisicao = "Erro durante a operação";
  //   });
  // }






  // selecionaServicoDetalhado() {
  //   this.servicosDetalhados = this.servicoDetelhado.getServicosDetalhadosList();
  // }
  // Ou essa opção abaixo?
  // 
  // selecionaServicoDetalhado(servicoDetelhado: ServicoDetalhado): void {
  //   this.animal = {...servicoDetalhado};
  //   this.exibeFormulario();
  // }







}
