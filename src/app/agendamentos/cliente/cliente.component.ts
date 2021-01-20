import { Component, OnInit, Output, EventEmitter } from '@angular/core';
import { LocalStorageService } from 'src/app/servicos/local-storage.service';
import { UsuarioService } from 'src/app/servicos/usuario.service';
import { JwtHelper } from 'src/app/util/jwt-helper';
import { USER_TOKEN } from 'src/app/util/constantes';
import { Cliente } from 'src/app/interfaces/cliente';

@Component({
  selector: 'app-cliente',
  templateUrl: './cliente.component.html',
  styleUrls: ['./cliente.component.scss']
})
export class ClienteComponent implements OnInit {
  idCliente: number;
  cliente: Cliente;

  constructor(private localStorageService:LocalStorageService,
    private usuarioService: UsuarioService,
    private jwtHelper: JwtHelper) { }

  ngOnInit(): void {
    this.localStorageService.getItem(USER_TOKEN).subscribe((token:string) => {
      if (!token) {
        return;
      }

      this.idCliente = this.jwtHelper.recuperaIdToken(token);

      this.usuarioService.buscarUsuario(this.idCliente).subscribe((cliente) => {
        this.cliente = JSON.parse(cliente);
      })
    });
  }
}
