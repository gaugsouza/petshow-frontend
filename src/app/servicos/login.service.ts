import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { LocalStorageService } from './local-storage.service';
import { USER_TOKEN } from '../util/constantes';
import { Login } from '../interfaces/login';
import { Usuario } from '../interfaces/usuario';
import { HttpHandlerService } from './http-handler.service';
import { ACESSO_SERVICE_URL } from 'src/app/util/url';

@Injectable({
  providedIn: 'root'
})
export class LoginService {
  // public ACESSO_BASE_URL = `${environment.API_URL}/acesso`;
  public isLogado:boolean = false;

  constructor(private httpHandler:HttpHandlerService,
              private storageService:LocalStorageService){}

  realizaLogin(login:Login):Observable<string> {
    const URL = `${ACESSO_SERVICE_URL}/login`;
    return this.httpHandler.doPost<string>(URL, login);
  }

  cadastrarUsuario(usuario:Usuario):Observable<string> {
    const URL = `${ACESSO_SERVICE_URL}/cadastro`;
    return this.httpHandler.doPost<string>(URL, usuario);
  }

  ativaConta(token:string):Observable<string> {
    const URL = `${ACESSO_SERVICE_URL}/ativar?token=${token}`;
    return this.httpHandler.doGet<string>(URL);
  }

  reenviaAtivacao(email:string):Observable<string> {
    const URL = `${ACESSO_SERVICE_URL}/reenvia-ativacao`;
    return this.httpHandler.doPost<string>(URL, email);
  }

  buscaTokenUsuario() {
    return JSON.stringify(this.storageService.getItem(USER_TOKEN));
  }
}
