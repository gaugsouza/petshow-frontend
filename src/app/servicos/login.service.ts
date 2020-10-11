import { Injectable } from '@angular/core';
import { Usuario } from '../interfaces/usuario';
import { TipoPessoa } from '../enum/tipo-pessoa.enum';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { usuariosMock } from '../mocks/usuarioMock';
import { environment } from 'src/environments/environment';
import { Observable, of, throwError } from 'rxjs';
import { catchError, map, tap } from 'rxjs/operators';
import { NGXLogger } from 'ngx-logger';
import { LocalStorageService } from './local-storage.service';
import { USUARIO_TOKEN } from '../util/constantes';
import { Login } from '../interfaces/login';

@Injectable({
  providedIn: 'root'
})
export class LoginService {
  public LOGIN_SERVICE_URL = `${environment.API_URL}/cliente/login`;
  httpOptions = {
    headers: new HttpHeaders({ 'Content-type' : 'application/json'})
  }
  constructor(private http:HttpClient, 
              private logger:NGXLogger,
              private storageService:LocalStorageService) { }

  realizaLogin(email:string, senha: string) : Observable<Usuario> {
    console.log(this.LOGIN_SERVICE_URL);
    let response = this.http.post<Usuario>(this.LOGIN_SERVICE_URL, {email, senha}, this.httpOptions)
    .pipe(
      tap(_ => this.logger.info(`Request feito a ${this.LOGIN_SERVICE_URL}`)),
      catchError(err => {
        this.handleError<Usuario>(`Falha em requisição feita a ${this.LOGIN_SERVICE_URL}`)
        return throwError(err);
      })
    );
    
    return response;
  }

  buscaTokenUsuario(){
    return this.storageService.getItem(USUARIO_TOKEN);
  }

  private handleError<T> (mensagem: string, result?: T) {
    return (error:any) : Observable<T> => {
      // console.log(error.error);
      this.logger.error(mensagem);
      return of(result as T);
    }
  }

  realizaLoginAutenticado(login: Login){
    let url = `${environment.API_URL}/acesso/login`;
    return this.http.post(url, login, {responseType: 'text' as 'json'});
  }

  test(token){
    let url = `${environment.API_URL}/acesso/`;
    let tokenStr = 'Bearer ' + token;
    const headers = new HttpHeaders().set("Authorization", tokenStr);
    return this.http.get(url, {headers, responseType: 'text' as 'json'})
  }
}
