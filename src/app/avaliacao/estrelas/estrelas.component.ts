import { Component, OnInit, Input } from '@angular/core';

@Component({
  selector: 'app-estrelas',
  templateUrl: './estrelas.component.html',
  styleUrls: ['./estrelas.component.scss']
})
export class EstrelasComponent implements OnInit {
  @Input("media") media:number = 0;
  constructor() { }

  ngOnInit(): void {}

  getEstrelasMediaAvaliacao() {
    let totalEstrelas = 5;
    let media = this.media;
    let estrelasInteiras = Math.floor(media);
    let estrelasEmBranco = totalEstrelas - Math.ceil(media);
    let estrelasPelaMetade = Math.ceil(media - estrelasInteiras);
    let arrConteudo:any[string] = [
      [...Array(estrelasInteiras).keys()].map(el => 'star'),
      [...Array(estrelasPelaMetade).keys()].map(el => 'star_half'),
      [...Array(estrelasEmBranco).keys()].map(el => 'star_border')
    ]; 
    return arrConteudo.flatMap(el => el);
  }

}
