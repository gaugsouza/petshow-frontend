import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { GeolocalizacaoComponent } from './geolocalizacao/geolocalizacao.component';
import { MapaComponent } from './mapa/mapa.component';
import { BuscaComponent } from './busca/busca.component';



@NgModule({
  declarations: [GeolocalizacaoComponent, MapaComponent, BuscaComponent],
  imports: [
    CommonModule
  ],
  exports: [
    GeolocalizacaoComponent,
    MapaComponent,
    BuscaComponent
  ]
})
export class GeolocalizacaoModule { }
