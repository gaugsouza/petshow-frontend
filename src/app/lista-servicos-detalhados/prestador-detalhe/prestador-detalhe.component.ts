import { Component, OnInit } from '@angular/core';
import { Prestador } from '../../interfaces/prestador';
import { PrestadorService } from '../../servicos/prestador.service';
import {ActivatedRoute} from '@angular/router';


@Component({
  selector: 'app-prestador-detalhe',
  templateUrl: './prestador-detalhe.component.html',
  styleUrls: ['./prestador-detalhe.component.scss']
})
export class PrestadorDetalheComponent implements OnInit {
  prestador:Prestador;
  prestadorId:number;

  constructor(private prestadorService:PrestadorService,
              private route: ActivatedRoute) {}

  ngOnInit(): void {
    this.prestadorId=+this.route.snapshot.paramMap.get('id');
    this.buscarPrestadorPorId(this.prestadorId);
  }



  buscarPrestadorPorId(id:number) : void {
    this.prestadorService.buscarPrestadorPorId(id)
    .subscribe((prestador) => {
      this.prestador = JSON.parse(prestador);
    })
  }; 




}
