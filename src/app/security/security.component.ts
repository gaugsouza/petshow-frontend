import { Component, OnInit } from '@angular/core';
import { LoginService } from '../servicos/login.service';
import { Login } from '../interfaces/login';

@Component({
  selector: 'app-security',
  templateUrl: './security.component.html',
  styleUrls: ['./security.component.scss']
})
export class SecurityComponent implements OnInit {

  login: any = {
    email: "dandan@laksjdg.com",
    senha: "092orijasf"
  }
  
  constructor(private loginService: LoginService) { }

  ngOnInit(): void {
    this.getAccessToken(this.login)
  }

  getAccessToken(request){
    this.loginService.realizaLoginAutenticado(request).subscribe(
      data => console.log(data));
  }
}
