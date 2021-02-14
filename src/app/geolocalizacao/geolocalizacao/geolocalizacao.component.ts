import { Component, OnInit } from '@angular/core';
import { GeolocalizacaoService } from 'src/app/servicos/geolocalizacao.service';
import { LocalStorageService } from 'src/app/servicos/local-storage.service';
import { UsuarioService } from 'src/app/servicos/usuario.service';

@Component({
  selector: 'app-geolocalizacao',
  templateUrl: './geolocalizacao.component.html',
  styleUrls: ['./geolocalizacao.component.scss']
})
export class GeolocalizacaoComponent implements OnInit {

  constructor(private localStorage:LocalStorageService,
              private usuarioService:UsuarioService,
              private service:GeolocalizacaoService) { }

  ngOnInit(): void {
  }

}
