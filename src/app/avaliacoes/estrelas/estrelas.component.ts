import { Component, OnInit, Input } from '@angular/core';

@Component({
  selector: 'app-estrelas',
  templateUrl: './estrelas.component.html',
  styleUrls: ['./estrelas.component.scss'],
})
export class EstrelasComponent implements OnInit {
  @Input('media') media:number = 0;

  constructor() { }

  ngOnInit = (): void => {}

  getEstrelasMediaAvaliacao = () => {
    const totalEstrelas = 5;
    const estrelasInteiras = Math.floor(this.media);
    const estrelasEmBranco = totalEstrelas - Math.ceil(this.media);
    const estrelasPelaMetade = Math.ceil(this.media - estrelasInteiras);
    const arrConteudo:any[string] = [
      [...Array(estrelasInteiras).keys()].map(() => 'star'),
      [...Array(estrelasPelaMetade).keys()].map(() => 'star_half'),
      [...Array(estrelasEmBranco).keys()].map(() => 'star_border'),
    ];
    return arrConteudo.flatMap((el:any) => el);
  }
}
