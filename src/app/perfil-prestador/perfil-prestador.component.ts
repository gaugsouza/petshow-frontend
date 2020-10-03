import { Component, OnInit } from '@angular/core';
import { PrestadorService } from '../servicos/prestador.service';
// import { Prestador } from '../interfaces/prestador';
import { TipoAnimal } from '../enum/TipoAnimal';
import { Router } from '@angular/router';
import { LocalStorageService } from '../servicos/local-storage.service';
import { Prestador } from './prestador';

@Component({
  selector: 'app-perfil-prestador',
  templateUrl: './perfil-prestador.component.html',
  styleUrls: ['./perfil-prestador.component.scss']
})
export class PerfilPrestadorComponent implements OnInit {

// prestador:Prestador;
prestador: Prestador = new Prestador();

erroRequisicao:String;
submitted = false;


constructor(private prestadorService:PrestadorService,
            private router:Router,
            private localStorageService: LocalStorageService) { }

  ngOnInit(): void {
  }

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

  
  newEmployee(): void {
    this.submitted = false;
    this.prestador = new Prestador();
  }

  salvarPrestador() {
    this.prestadorService
    .criaPrestador(this.prestador).subscribe(data => {
      console.log(data)
      this.prestador = new Prestador();
      this.gotoList();
    }, 
    error => console.log(error));
  }

  onSubmit() { // enviar o novo prestador - comando de confirmação
    this.submitted = true;
    this.salvarPrestador();    
  }

  gotoList() { // define a rota
    this.router.navigate(['/prestador']);
  }


}
