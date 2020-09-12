import { Component, OnInit } from '@angular/core';
import { UsuarioService } from 'src/app/servicos/usuario.service';
import { Login } from 'src/app/interfaces/login';
import { LocalStorageService } from 'src/app/servicos/local-storage.service';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss']
})
export class LoginComponent implements OnInit {
  login:Login = {
    email: "",
    senha: ""
  };

  constructor(private usuarioService:UsuarioService,
              private localStorageService:LocalStorageService) { }

  ngOnInit(): void {
  }

  realizaLogin() {
    console.log(this.login);
    this.usuarioService.buscaPorLogin(this.login).subscribe(usuario => this.localStorageService.setItem('usuario', usuario));
  }


}
