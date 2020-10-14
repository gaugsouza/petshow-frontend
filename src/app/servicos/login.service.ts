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

@Injectable({
  providedIn: 'root'
})
export class LoginService {
  public ACESSO_BASE_URL = `${environment.API_URL}/acesso`;

  httpOptions = {
    headers: new HttpHeaders({ 'Content-type' : 'application/json' }),
    responseType: 'text' as 'json'
  }

  constructor(private http:HttpClient, 
              private logger:NGXLogger,
              private storageService:LocalStorageService) { }

  realizaLogin(login: Login) : Observable<String> {
    let url = `${this.ACESSO_BASE_URL}/login`;
    return this.http.post<String>(url, login, this.httpOptions)
    .pipe(
      tap(_ => this.logger.info(`Request feito a ${this.ACESSO_BASE_URL}`)),
      catchError(err => {
        this.handleError<String>(`Falha em requisição feita a ${this.ACESSO_BASE_URL}`)
        return throwError(err);
      })
    );
  }

  buscaTokenUsuario() {
    return JSON.stringify(this.storageService.getItem(USER_TOKEN));
  }

  cadastrarUsuario(usuario:Usuario):Observable<String> {
    const URL = `${this.ACESSO_BASE_URL}/cadastro`;
    return this.http.post<String>(URL, usuario, this.httpOptions)
    .pipe(
      tap(_ => this.logger.info(`Request feita a ${URL}`)),
      catchError(({error}) => {
        this.handleError<string>(`Erro em requisição feita a ${URL}`);
        return throwError(error);
      })
    );    
  }

  private handleError<T> (mensagem: string, result?: T) {
    return (error:any) : Observable<T> => {
      this.logger.error(mensagem);
      return of(result as T);
    }
  }
}
