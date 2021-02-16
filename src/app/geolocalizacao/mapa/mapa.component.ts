import { Component, Input, OnInit } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { Router } from '@angular/router';
import ol from 'openlayers';
import { FiltroServicos } from 'src/app/interfaces/filtro-servicos';
import { Geolocalizacao } from 'src/app/interfaces/geolocalizacao';
import { ServicoDetalhado } from 'src/app/interfaces/servico-detalhado';
import { GeolocalizacaoService } from 'src/app/servicos/geolocalizacao.service';
import { LocalStorageService } from 'src/app/servicos/local-storage.service';
import { ServicosService } from 'src/app/servicos/servicos.service';
import { UsuarioService } from 'src/app/servicos/usuario.service';
import { USER_TOKEN } from 'src/app/util/constantes';
import { DialogServicoSelecionadoComponent } from '../dialog-servico-selecionado/dialog-servico-selecionado.component';

@Component({
  selector: 'app-mapa',
  templateUrl: './mapa.component.html',
  styleUrls: ['./mapa.component.scss']
})
export class MapaComponent implements OnInit {
  @Input('filtro') filtro: FiltroServicos;
  servicos:ServicoDetalhado[];
  geolocalizacao:Geolocalizacao;
  source:ol.source.Vector;

  map:ol.Map;
  longitude:number;
  latitude: number;
  zoom: number;
  constructor(private localStorage:LocalStorageService,
    private usuarioService:UsuarioService,
    private dialog:MatDialog,
    private service:GeolocalizacaoService,
    private servicoService:ServicosService) { }

  ngOnInit(): void {
    this.preencheDadosGeoloc();
  }

  preencheDadosGeoloc() {
    this.servicoService.buscarServicosGeoloc(this.filtro).subscribe((servicos) => {
      this.servicos = JSON.parse(servicos);
      this.localStorage.getItem(USER_TOKEN).subscribe((token:string) => {
        if(!token) {
          this.geraMapa(this.geolocalizacao, this.servicos);
          return;
        }

        this.usuarioService.getUsuario(token).subscribe((usuario) => {
          if(this.usuarioService.isCliente(usuario)) {
            this.geolocalizacao = usuario.geolocalizacao;
          }

          this.geraMapa(this.geolocalizacao, this.servicos, usuario.nome);
        })
      });
    })
  }

  geraMapa(geolocalizacao: Geolocalizacao, servicos:ServicoDetalhado[], name?:string) {
    this.latitude = Number.parseFloat((geolocalizacao || {} ).geolocLatitude || '0');
    this.longitude = Number.parseFloat((geolocalizacao || {}).geolocLongitude || '0');
    this.zoom = this.geolocalizacao ? 15 : 3;
    this.criaMapa([this.longitude, this.latitude], this.zoom, servicos, name);
  }

  criaMapa = (mapCenter:ol.Coordinate = [0,0], mapZoom = 3, servicos = [], name?:string) => {
    const cliente = this.criaPontoCliente(mapCenter, name);
    const pontosServicos = this.criaPontosServico(servicos);
    const source = new ol.source.Vector({
      features: [cliente, ...pontosServicos]
    });

    const vectorLayer = new ol.layer.Vector({
      source
    });

    this.map = new ol.Map({
      target: 'map',
      layers: [
        new ol.layer.Tile({
          source: new ol.source.OSM()
        }),
        vectorLayer
      ],
      view: new ol.View({
        center: ol.proj.transform(mapCenter, 'EPSG:4326', 'EPSG:3857'),
        zoom: mapZoom
      })
    });

    this.map.on("pointermove", function (evt:ol.MapBrowserEvent) {
      if(evt.dragging) return;

      var hit = this.forEachFeatureAtPixel(evt.pixel, function(feature:any) {
          return feature.get('name') === 'prestador';
      }); 
      if (hit) {
          this.getTargetElement().style.cursor = 'pointer';
      } else {
          this.getTargetElement().style.cursor = '';
      }
    });

    this.map.on('click', function(evt:ol.MapBrowserEvent) {
      if(evt.dragging) return;

      var hit = this.forEachFeatureAtPixel(evt.pixel, function(feature:any) {
        return feature;
      });

      if(hit) {
        hit.dispatchEvent('click');
      }
    });
  }

  criaPontosServico(servicos:ServicoDetalhado[]) {
    return servicos.map(servico => {
      const { prestador } = servico;
      const posicao:ol.Coordinate = [Number.parseFloat(prestador.geolocalizacao.geolocLongitude), Number.parseFloat(prestador.geolocalizacao.geolocLatitude)];
      const evento = () => {
        this.openDialog(servico);
      }

      return this.criaPonto('assets/icons/iconePrestador.png', posicao, 'prestador', prestador.nome, evento);
    })    
  }

  private openDialog(servico:ServicoDetalhado) {
    this.dialog.open(DialogServicoSelecionadoComponent, {
      data: servico,
      width: '1200px'
    })
  }

  criaPontoCliente(posicao?:ol.Coordinate, name?:string) {
    if(!posicao) {
      return;
    }
    return this.criaPonto('assets/icons/iconeCliente.png', posicao, name, name);
  }

  criaPonto(iconSrc:string, posicao:ol.Coordinate, name?:string, text?:string, event?:any) {
    const ponto = new ol.Feature({
      geometry: new ol.geom.Point(ol.proj.fromLonLat(posicao)),
      name,
    });

    ponto.setStyle(new ol.style.Style({
      image: new ol.style.Icon({
        crossOrigin: 'anonimous',
        src: iconSrc,
        scale: 0.02
      }),
      text: new ol.style.Text({
        text: text,
        fill: new ol.style.Fill({color: '#69354a'}),
        offsetY: -12,
        stroke: new ol.style.Stroke({color: '#000', width: 0.5}),
        font: '18px'
      }),
    }));
    
    if(event) {
      ponto.on('click', event);
    }


    return ponto;
  }
}
