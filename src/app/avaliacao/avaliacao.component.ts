import { Component, OnInit } from '@angular/core';
import { LocalStorageService } from '../servicos/local-storage.service';

@Component({
  selector: 'app-avaliacao',
  templateUrl: './avaliacao.component.html',
  styleUrls: ['./avaliacao.component.scss']
})
export class AvaliacaoComponent implements OnInit {

  constructor(private localStorageService:LocalStorageService) { }

  ngOnInit(): void {
  }

}
