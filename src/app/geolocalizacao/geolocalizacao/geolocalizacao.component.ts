import { Component, OnInit } from '@angular/core';
import { Geolocalizacao } from 'src/app/interfaces/geolocalizacao';
import { GeolocalizacaoService } from 'src/app/servicos/geolocalizacao.service';
import { LocalStorageService } from 'src/app/servicos/local-storage.service';
import { UsuarioService } from 'src/app/servicos/usuario.service';
import { USER_TOKEN } from 'src/app/util/constantes';

@Component({
  selector: 'app-geolocalizacao',
  templateUrl: './geolocalizacao.component.html',
  styleUrls: ['./geolocalizacao.component.scss']
})
export class GeolocalizacaoComponent implements OnInit {
  geolocalizacao:Geolocalizacao;

  constructor() { }

  ngOnInit(): void {
  }

}
