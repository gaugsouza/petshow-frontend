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

  // getUsuario(id:number) : void { //pesquisar por id do prestador
  //   this.prestadorService.getPrestador(id)
  //   .subscribe((prestador:Prestador) => {
  //     if(!prestador) {
  //       this.router.navigate(['/prestador']);
  //       return;
  //     }
  //     this.prestador = prestador
  //   });
  // }



  criarPrestador(prestador:Prestador) {
    this.prestadorService.criaPrestador(prestador)
      .subscribe(res => {
          const id = res['_id'];
          this.router.navigate(['/prestador', id]);
        }, (err) => {
          console.log(err);
          this.erroRequisicao = "Erro durante a operação";
        });
  }


}
