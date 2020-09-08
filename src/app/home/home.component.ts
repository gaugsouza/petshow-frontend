import { Component, OnInit } from '@angular/core';
import { LocalStorageService } from '../servicos/local-storage.service';
import { usuariosMock } from '../mocks/usuarioMock';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.scss']
})
export class HomeComponent implements OnInit {

  constructor(private storageService:LocalStorageService) { }

  ngOnInit(): void {
    const usuarioMock = usuariosMock[0];
    console.log(usuarioMock);
    this.storageService.setItem('usuario', usuarioMock)
    .subscribe(usuario => {
      console.log('usuarioLogado', usuario);
    })
  }

}
