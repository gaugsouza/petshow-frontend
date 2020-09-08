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
  constructor(private usuarioService:UsuarioService,
              private route:ActivatedRoute) { }

  ngOnInit(): void {
    this.getUsuario();
  }

  getUsuario() : void {
    const id = +this.route.snapshot.paramMap.get('id');
    this.usuarioService.getUsuario(id)
    .subscribe(usuario => this.usuario = usuario)
  }

}
