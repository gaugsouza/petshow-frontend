import { Component, Input, OnInit, Output, EventEmitter } from '@angular/core';
import { FiltroServicos } from 'src/app/interfaces/filtro-servicos';
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
  @Input('filtro') filtro: FiltroServicos;
  @Input() isAtivo:boolean;
  @Input() isCliente:boolean;
  @Output('altera-filtro') alteraFiltro = new EventEmitter<FiltroServicos>()
  geolocalizacao:Geolocalizacao;

  constructor() { }

  ngOnInit(): void {
  }

  alterarFiltro(filtro:FiltroServicos) {
    // console.log('filtro', filtro);
    this.alteraFiltro.emit(filtro);
  }

}
