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
              private router:Router) { }

  ngOnInit(): void {
    this.localStorageService.getItem('usuario')
    .subscribe(usuario => {
      if(usuario) {
        this.router.navigate(['/perfil'])
      }
    });
  }

  hasErrors() {
    return this.emailFormControl.hasError('email') || this.emailFormControl.hasError('required') || this.passwordFormControl.hasError('required');
  }
  realizaLogin() {
    this.loginService.realizaLogin(this.login.email, this.login.senha)
    .subscribe(
      (res:Cliente) => {
        if(res) {
          this.localStorageService.setItem('usuario', {...res, cliente:true}).subscribe(() => {
            this.router.navigate(['/perfil']);
          });
        }
      },
      ({error}) => {
        this.errorMessage = typeof error === 'string' ? error: 'Erro durante operação';
        this.login.senha = "";
      
      },
      () => console.log('terminou')
    );
  }


}

// login":{
//   "email": "dandan@laksjdg.com",
//   "senha": "092orijasf"
// },