import { Injectable } from '@angular/core';
import { environment } from 'src/environments/environment';
import { HttpHeaders, HttpClient } from '@angular/common/http';
import { Observable, of, throwError } from 'rxjs';
import { catchError, map, tap } from 'rxjs/operators';
import { Usuario } from '../interfaces/usuario';
import { NGXLogger } from 'ngx-logger';
import { LocalStorageService } from './local-storage.service';
import { usuariosMock } from '../mocks/usuarioMock';
import { Login } from '../interfaces/login';
import { AnimalEstimacao } from '../interfaces/AnimalEstimacao';
import { USUARIO_TOKEN } from '../util/constantes';

@Injectable({
  providedIn: 'root'
})
export class UsuarioService {
  public USUARIO_SERVICE_URL = `${environment.API_URL}/cliente`;

  httpOptions = {
    headers: new HttpHeaders({ 'Content-type' : 'application/json'})
  }

  constructor(private http:HttpClient, 
              private logger: NGXLogger,
              private storageService:LocalStorageService) { }

  

  getUsuario = (id:number): Observable<Usuario> => {
    const url = `${this.USUARIO_SERVICE_URL}/${id}`;
    return this.http.get<Usuario>(url)
    .pipe(
      tap(_ => this.logger.info(`Request feito a ${url}`)),
      catchError(this.handleError<Usuario>(`Falha em requisição feita a ${url}`))
    );
  }

  private handleError<T> (mensagem: string, result?: T) {
    return (error:any) : Observable<T> => {
      this.logger.error(mensagem);
      return of(result as T);
    }
  }

  atualizaUsuario = (usuario:Usuario) : Observable<Usuario> => {
    console.log(usuario);
    return this.http.put<Usuario>(this.USUARIO_SERVICE_URL, usuario, this.httpOptions)
    .pipe(
      tap(_ => this.logger.info(`Request feito a ${this.USUARIO_SERVICE_URL}`)),
      catchError(err => {
        this.handleError<Usuario>('update');
        return throwError(err);
      })
    );
  } 


  buscaPorLogin = (login: Login) : Observable<any> => {
    let url = `${this.USUARIO_SERVICE_URL}/login`;
    return this.http.post(url, login, this.httpOptions)
    .pipe(
      tap(_ => this.logger.info(`Request feito a ${url}`)),
      catchError(this.handleError<Usuario>('login'))
    );
  }

  buscaTokenUsuario(){
    return this.storageService.getItem(USUARIO_TOKEN);
  }

  adicionarAnimalEstimacao = (animalEstimacao:AnimalEstimacao) : Observable<any> => {
    let url = `${this.USUARIO_SERVICE_URL}/animal-estimacao`;
    console.log(url);
    return this.http.post(url, animalEstimacao, this.httpOptions)
    .pipe(
      tap(_ => this.logger.info(`Request feito a ${url}`)),
      catchError(this.handleError<AnimalEstimacao>('post'))
      );
  }
}
