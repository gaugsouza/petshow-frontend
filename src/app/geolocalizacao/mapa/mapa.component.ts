import { Component, OnInit } from '@angular/core';
import ol from 'openlayers';

@Component({
  selector: 'app-mapa',
  templateUrl: './mapa.component.html',
  styleUrls: ['./mapa.component.scss']
})
export class MapaComponent implements OnInit {
  map:ol.Map;
  constructor() { }

  ngOnInit(): void {
    this.criaMapa();
  }

  criaMapa = (mapZoom = 3, mapCenter:ol.Coordinate = [0,0]) => {
    this.map = new ol.Map({
      target: 'map',
      layers: [
        new ol.layer.Tile({
          source: new ol.source.OSM()
        })
      ],
      view: new ol.View({
        center: ol.proj.transform(mapCenter, 'EPSG:4326', 'EPSG:3857'),
        zoom: mapZoom
      })
    });
  }

}
