import { Component, OnInit } from '@angular/core';
import { ContaService } from '../servicos/conta.service';
import { LocalStorageService } from '../servicos/local-storage.service';
import { USUARIO_TOKEN } from '../util/constantes';
import { Usuario } from '../interfaces/usuario';
import { TipoPessoa } from '../enum/tipo-pessoa.enum';
import { Router } from '@angular/router';

@Component({
  selector: 'app-perfil',
  templateUrl: './perfil.component.html',
  styleUrls: ['./perfil.component.scss']
})
export class PerfilComponent implements OnInit {
  isCliente:boolean = false;
  isPrestador:boolean = false;
  constructor(private contaService:ContaService,
              private localStorageService:LocalStorageService,
              private router:Router) { }

  ngOnInit(): void {
    this.localStorageService.getItem(USUARIO_TOKEN).subscribe(token => {
      this.contaService.buscarPorId(+token).subscribe((usuario:Usuario) => {
        if(!usuario) {
          this.router.navigate(['/login']);
          return;
        }
        this.isCliente = usuario.tipo === TipoPessoa.CLIENTE;
        this.isPrestador = usuario.tipo === TipoPessoa.PRESTADOR_AUTONOMO;
      });
    });
  }

}
