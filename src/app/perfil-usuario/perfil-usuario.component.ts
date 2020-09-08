import { Component, OnInit } from '@angular/core';
import { UsuarioService } from '../servicos/usuario.service';
import { Usuario } from '../interfaces/usuario';
import { ActivatedRoute } from '@angular/router';
import { Cliente } from '../interfaces/cliente';

@Component({
  selector: 'app-perfil-usuario',
  templateUrl: './perfil-usuario.component.html',
  styleUrls: ['./perfil-usuario.component.scss']
})
export class PerfilUsuarioComponent implements OnInit {
  usuario:Cliente;
  constructor(private usuarioService:UsuarioService) { }

  ngOnInit(): void {
    this.getUsuario();
  }

  getUsuario() : void {
    this.usuarioService.buscaUsuarioStorage()
    .subscribe((usuario:Cliente) => this.usuario = usuario);
  }
}
