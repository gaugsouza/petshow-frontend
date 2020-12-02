import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { environment } from 'src/environments/environment';
import { Observable, of, throwError } from 'rxjs';
import { catchError, map, tap } from 'rxjs/operators';
import { NGXLogger } from 'ngx-logger';
import { LocalStorageService } from './local-storage.service';
import { USER_TOKEN } from '../util/constantes';
import { Login } from '../interfaces/login';
import { Usuario } from '../interfaces/usuario';
import { HttpHandlerService } from './http-handler.service';

@Injectable({
  providedIn: 'root'
})
export class LoginService {
  public ACESSO_BASE_URL = `${environment.API_URL}/acesso`;
  public isLogado:boolean = false;

  constructor(private httpHandler:HttpHandlerService,
              private storageService:LocalStorageService){}

  realizaLogin(login:Login):Observable<string> {
    const URL = `${this.ACESSO_BASE_URL}/login`;
    return this.httpHandler.doPost<string>(URL, login);
  }

  cadastrarUsuario(usuario:Usuario):Observable<string> {
    const URL = `${this.ACESSO_BASE_URL}/cadastro`;
    return this.httpHandler.doPost<string>(URL, usuario);
  }

  ativaConta(token:string):Observable<string> {
    const URL = `${this.ACESSO_BASE_URL}/ativar?token=${token}`;
    return this.httpHandler.doGet<string>(URL);
  }

  reenviaAtivacao(token:string, email:string):Observable<string> {
    const URL = `${this.ACESSO_BASE_URL}/reenvia-ativacao/`;
    return this.httpHandler.doPost<string>(URL, email, token);
  }

  buscaTokenUsuario() {
    return JSON.stringify(this.storageService.getItem(USER_TOKEN));
  }
}
