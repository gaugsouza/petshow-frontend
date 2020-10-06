import { Component, OnInit } from '@angular/core';
import { LocalStorageService } from '../servicos/local-storage.service';
import { usuariosMock } from '../mocks/usuarioMock';
import { Router } from '@angular/router';
import { ServicosService } from '../servicos/servicos.service';
import { Servico } from '../interfaces/servico';
import { TranslateService } from '@ngx-translate/core';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.scss']
})
export class HomeComponent implements OnInit {
  servicos:Servico[]=[{id:1, nome:"Banho e Tosa"},{id:2, nome:"Passeio"},{id:3, nome:"Pet Sitting"}];
  
  constructor(private servicosService: ServicosService,
              private storageService:LocalStorageService,
              private router:Router,
              private translate: TranslateService
              ) { }

  ngOnInit(): void {

  }

  exibirServicosDetalhados(id:number) {
    this.router.navigate(['/servicos-detalhados/tipo-servico/${id}']);
    this.storageService.setItem('tipo', id);
  }




}