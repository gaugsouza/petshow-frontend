import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { GeolocalizacaoComponent } from './geolocalizacao/geolocalizacao.component';
import { MapaComponent } from './mapa/mapa.component';
import { BuscaComponent } from './busca/busca.component';
import { DialogServicoSelecionadoComponent } from './dialog-servico-selecionado/dialog-servico-selecionado.component';
import { ConfigModule } from '../config/config.module';
import { MatDialogModule } from '@angular/material/dialog';
import { MatButtonModule } from '@angular/material/button';
import { MatCardModule } from '@angular/material/card';
import {MatListModule} from '@angular/material/list';
import { MatIconModule } from '@angular/material/icon';
import { MatInputModule } from '@angular/material/input';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';

@NgModule({
  declarations: [GeolocalizacaoComponent, MapaComponent, BuscaComponent, DialogServicoSelecionadoComponent],
  imports: [
    CommonModule,
    ConfigModule,
    MatDialogModule,
    MatButtonModule,
    MatCardModule,
    MatListModule,
    MatIconModule,
    MatInputModule,
    FormsModule, 
    ReactiveFormsModule,
  ],
  exports: [
    GeolocalizacaoComponent,
    MapaComponent,
    BuscaComponent,
  ]
})
export class GeolocalizacaoModule { }
