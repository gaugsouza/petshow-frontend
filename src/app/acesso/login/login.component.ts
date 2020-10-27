import { Component, OnInit } from '@angular/core';
import {FormControl, FormGroupDirective, NgForm, Validators} from '@angular/forms';
import {ErrorStateMatcher} from '@angular/material/core';
import { UsuarioService } from 'src/app/servicos/usuario.service';
import {Cliente} from '../../interfaces/cliente';
import { Login } from 'src/app/interfaces/login';
import { LocalStorageService } from 'src/app/servicos/local-storage.service';
import { LoginService } from 'src/app/servicos/login.service';
import { Router } from '@angular/router';
import {MyErrorStateMatcher} from '../../classes/my-error-state-matcher';
import { AppComponent } from 'src/app/app.component';
import { USER_TOKEN } from 'src/app/util/constantes';
import { DataSharingService } from 'src/app/servicos/data-sharing.service';

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
  emailFormControl = new FormControl('', [
    Validators.required,
    Validators.email,
  ]);

  errorMessage : string = ""
  passwordFormControl = new FormControl('', [
    Validators.required
  ]);
  matcher = new MyErrorStateMatcher();

  constructor(private loginService:LoginService,
              private localStorageService:LocalStorageService,
              private router:Router,
              private dataSharing:DataSharingService) { }

  ngOnInit(): void {
    this.localStorageService.getItem(USER_TOKEN)
    .subscribe(token => {
      if(token) {
        this.dataSharing.isUsuarioLogado.next(true);
        this.router.navigate(['/perfil'])
      }
    });
  }

  hasErrors() {
    return this.emailFormControl.hasError('email') || this.emailFormControl.hasError('required') || this.passwordFormControl.hasError('required');
  }

  realizaLogin() {
  this.loginService.realizaLogin(this.login).subscribe(
    token => {
      this.localStorageService.setItem(USER_TOKEN, token).subscribe(() => {
        this.dataSharing.isUsuarioLogado.next(true);;
        this.router.navigate(['/perfil']);
      });
    },
    ({error}) => {
      this.errorMessage = typeof error === 'string' ? error: 'Erro durante operação';
      this.login.senha = "";      
    });
  }
}
