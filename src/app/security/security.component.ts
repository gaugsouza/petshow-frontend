import { Component, OnInit } from '@angular/core';
import { LoginService } from '../servicos/login.service';
import { Login } from '../interfaces/login';

@Component({
  selector: 'app-security',
  templateUrl: './security.component.html',
  styleUrls: ['./security.component.scss']
})
export class SecurityComponent implements OnInit {

  login: Login = {
    email: "dandan@laksjdg.com",
    senha: "092orijasf"
}
  
  constructor(private loginService: LoginService) { }

  ngOnInit(): void {
    this.getAccessToken(this.login)
  }

  getAccessToken(request: Login){
    let response = this.loginService.realizaLoginAutenticado(this.login);
    response.subscribe(data=>console.log(data));
  }
}
