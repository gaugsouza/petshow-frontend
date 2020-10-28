import { Component, OnInit } from '@angular/core';
import { LocalStorageService } from '../servicos/local-storage.service';
import { usuariosMock } from '../mocks/usuarioMock';
import { Router } from '@angular/router';
import { ServicosService } from '../servicos/servicos.service';
import { Servico } from '../interfaces/servico';
import { TranslateService } from '@ngx-translate/core';
import { SERVICOS } from '../util/tipo-servico';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.scss']
})
export class HomeComponent implements OnInit {
  servicos:Servico[];
  constructor(private servicoService: ServicosService) { }

  ngOnInit(): void {
    this.servicoService.getTipos().subscribe(servicos => {
      this.servicos = JSON.parse(servicos) || SERVICOS;
    },
    err => {
      this.servicos = SERVICOS;
    })
  }
}