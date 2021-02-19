import {
  Component, Input, OnInit, Output, EventEmitter,
} from '@angular/core';
import { FiltroServicos } from 'src/app/interfaces/filtro-servicos';
import { Geolocalizacao } from 'src/app/interfaces/geolocalizacao';

@Component({
  selector: 'app-geolocalizacao',
  templateUrl: './geolocalizacao.component.html',
  styleUrls: ['./geolocalizacao.component.scss'],
})
export class GeolocalizacaoComponent implements OnInit {
  @Input('filtro') filtro: FiltroServicos;

  @Input() isAtivo:boolean;

  @Input() isCliente:boolean;

  @Input() isLogado:boolean;

  @Output('altera-filtro') alteraFiltro = new EventEmitter<FiltroServicos>()

  geolocalizacao:Geolocalizacao;

  constructor() { }

  ngOnInit = (): void => {
  }

  alterarFiltro(filtro:FiltroServicos) {
    this.alteraFiltro.emit(filtro);
  }
}
