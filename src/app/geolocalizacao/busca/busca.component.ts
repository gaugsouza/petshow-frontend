import {
  Component, EventEmitter, Input, OnInit, Output,
} from '@angular/core';
import { FiltroServicos } from 'src/app/interfaces/filtro-servicos';
import { GeolocalizacaoService } from 'src/app/servicos/geolocalizacao.service';

@Component({
  selector: 'app-busca',
  templateUrl: './busca.component.html',
  styleUrls: ['./busca.component.scss'],
})
export class BuscaComponent implements OnInit {
  @Input('filtro') filtro: FiltroServicos;

  @Output('altera-filtro') alteraFiltro = new EventEmitter<FiltroServicos>()

  rua:string;

  numero: string;

  constructor(private service:GeolocalizacaoService) { }

  ngOnInit = (): void => {
  }

  alteraGeoloc() {
    if (this.rua) {
      this.service.buscaGeoloc(this.rua, this.numero).subscribe((res) => {
        const retorno = JSON.parse(res);
        if (!retorno || !retorno.length) {
          return;
        }
        const { lat: geolocLatitude, lon: geolocLongitude } = retorno[0];

        this.filtro = { ...this.filtro, posicaoAtual: { geolocLatitude, geolocLongitude } };
        this.alteraFiltro.emit(this.filtro);
      });
    }
  }
}
