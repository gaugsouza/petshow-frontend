import { Component, OnInit } from '@angular/core';
import { LocalStorageService } from 'src/app/servicos/local-storage.service';
import { USER_TOKEN } from 'src/app/util/constantes';
import { TipoPessoa } from 'src/app/enum/tipo-pessoa.enum';
import { Router } from '@angular/router';
import { JwtHelper } from 'src/app/util/jwt-helper';

@Component({
  selector: 'app-perfil',
  templateUrl: './perfil.component.html',
  styleUrls: ['./perfil.component.scss'],
})
export class PerfilComponent implements OnInit {
  isCliente:boolean = false;

  isPrestador:boolean = false;

  constructor(private localStorageService:LocalStorageService,
              private router:Router,
              private jwtHelper: JwtHelper) { }

  ngOnInit(): void {
    this.localStorageService.getItem(USER_TOKEN).subscribe((token : string) => {
      if (!token) {
        this.router.navigate(['/login']);
      }
      const decodedToken = this.jwtHelper.decodeToken(token);
      this.isCliente = decodedToken.tipo === TipoPessoa.CLIENTE;
      this.isPrestador = decodedToken.tipo === TipoPessoa.PRESTADOR_AUTONOMO;
    });
  }
}
