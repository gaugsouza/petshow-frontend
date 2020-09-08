import { Injectable } from '@angular/core';
import { Usuario } from '../interfaces/usuario';
import { TipoPessoa } from '../enum/tipo-pessoa.enum';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { usuariosMock } from '../mocks/usuarioMock';
import { environment } from 'src/environments/environment';
import { Observable, of } from 'rxjs';
import { catchError, map, tap } from 'rxjs/operators';
import { NGXLogger } from 'ngx-logger';
import { LocalStorageService } from './local-storage.service';

@Injectable({
  providedIn: 'root'
})
export class LoginService {
  public LOGIN_SERVICE_URL = `${environment.API_URL}logins`;
  httpOptions = {
    headers: new HttpHeaders({ 'Content-type' : 'application/json'})
  }
  constructor(private http:HttpClient, 
              private logger:NGXLogger,
              private storageService:LocalStorageService) { }

  realizaLogin(email:string, senha: string) : Observable<Usuario> {
    let response = this.http.post<Usuario>(this.LOGIN_SERVICE_URL, {email, senha}, this.httpOptions)
    .pipe(
      tap(_ => this.logger.info(`Request feito a ${this.LOGIN_SERVICE_URL}`)),
      catchError(this.handleError<Usuario>(`Falha em requisição feita a ${this.LOGIN_SERVICE_URL}`))
    );
    
    response.subscribe(usuario => {
      if(usuario) {
        this.storageService.setItem('usuario', usuario);
      }
    });

    return response;
  }

  buscaUsuarioLogado() {
    return this.storageService.getItem('usuario');
  }

  private handleError<T> (mensagem: string, result?: T) {
    return (error:any) : Observable<T> => {
      this.logger.error(mensagem);
      return of(result as T);
    }
  }
}
