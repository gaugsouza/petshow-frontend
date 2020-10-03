import { Component, OnInit } from '@angular/core';
import { LocalStorageService } from '../servicos/local-storage.service';
import { usuariosMock } from '../mocks/usuarioMock';
import { Router } from '@angular/router';
import { ServicosService } from '../servicos/servicos.service';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.scss']
})
export class HomeComponent implements OnInit {

  constructor(private servicosService: ServicosService,
              private storageService:LocalStorageService,
              private router:Router) { }

  ngOnInit(): void {
    // this.router.navigate(['/perfil']);
  }
  
  exibePrestadoresBanho (Prestador): 1 {
    this.servicosService.buscarPrestadoresPorServico(1)
    .subscribe((prestador:Prestador))=>{
      this.prestador = prestador
    });
  }

  exibePrestadoresWalking(){

  }
  exibePrestadoresSitting(){

  }
}