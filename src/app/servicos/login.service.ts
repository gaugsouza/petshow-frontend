import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { environment } from 'src/environments/environment';
import { Observable, of, throwError } from 'rxjs';
import { catchError, map, tap } from 'rxjs/operators';
import { NGXLogger } from 'ngx-logger';
import { LocalStorageService } from './local-storage.service';
import { USER_TOKEN } from '../util/constantes';
import { Login } from '../interfaces/login';

@Injectable({
  providedIn: 'root'
})
export class LoginService {
  public LOGIN_BASE_URL = `${environment.API_URL}/acesso`;

  httpOptions = {
    headers: new HttpHeaders({ 'Content-type' : 'application/json' }),
    responseType: 'text' as 'json'
  }

  constructor(private http:HttpClient, 
              private logger:NGXLogger,
              private storageService:LocalStorageService) { }

  realizaLogin(login: Login) : Observable<String> {
    let url = `${this.LOGIN_BASE_URL}/login`;
    return this.http.post<String>(url, login, this.httpOptions)
    .pipe(
      tap(_ => this.logger.info(`Request feito a ${this.LOGIN_BASE_URL}`)),
      catchError(err => {
        this.handleError<String>(`Falha em requisição feita a ${this.LOGIN_BASE_URL}`)
        return throwError(err);
      })
    );
  }

  buscaTokenUsuario() {
    return JSON.stringify(this.storageService.getItem(USER_TOKEN));
  }

  private handleError<T> (mensagem: string, result?: T) {
    return (error:any) : Observable<T> => {
      // console.log(error.error);
      this.logger.error(mensagem);
      return of(result as T);
    }
  }
}
