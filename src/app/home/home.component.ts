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
  servicos:Servico[]=[{id:2, nome:"BANHO"},{id:12, nome:"PASSEIO"},{id:22, nome:"PET SITTING"}];
  
  constructor() { }

  ngOnInit(): void {

  }
}