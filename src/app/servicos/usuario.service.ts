import { Injectable } from '@angular/core';
import { environment } from 'src/environments/environment';
import { HttpHeaders, HttpClient } from '@angular/common/http';
import { Observable, of, throwError } from 'rxjs';
import { catchError, map, tap } from 'rxjs/operators';
import { Usuario } from '../interfaces/usuario';
import { NGXLogger } from 'ngx-logger';
import { LocalStorageService } from './local-storage.service';
import { Login } from '../interfaces/login';
import { AnimalEstimacao } from '../interfaces/AnimalEstimacao';
import { USER_TOKEN } from '../util/constantes';
import { TipoAnimal } from '../enum/TipoAnimal';
import { JwtHelper } from '../util/jwt-helper';

@Injectable({
  providedIn: 'root'
})
export class UsuarioService {
  public USUARIO_SERVICE_URL = `${environment.API_URL}/cliente`;
  
  token = this.localStorageService.getItem(USER_TOKEN);
  authorization = 'Bearer ' + this.token;
  httpOptions = {
    headers: new HttpHeaders({ 'Content-type' : 'application/json',
                               'Authorization' : this.authorization})
  }

  constructor(private http:HttpClient, 
              private logger: NGXLogger,
              private storageService:LocalStorageService,
              private localStorageService: LocalStorageService,
              private jwtHelper: JwtHelper) { }

  getUsuario() : Observable<Usuario> {
    let id = this.jwtHelper.decodeToken(this.token).id;
    const url = `${this.USUARIO_SERVICE_URL}/${id}`;
    
    return this.http.get<Usuario>(url)
    .pipe(
    tap(_ => this.logger.info(`Request feito a ${url}`)),
    catchError(this.handleError<Usuario>(`Falha em requisição feita a ${url}`)))  
     
  }

  private handleError<T> (mensagem: string, result?: T) {
    return (error:any) : Observable<T> => {
      this.logger.error(mensagem);
      return of(result as T);
    }
  }

  atualizaUsuario = (usuario:Usuario) : Observable<Usuario> => {
    let url = `${this.USUARIO_SERVICE_URL}/${usuario.id}`
    return this.http.put<Usuario>(url, usuario, this.httpOptions)
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
    return this.storageService.getItem(USER_TOKEN);
  }

  adicionarAnimalEstimacao = (animalEstimacao:AnimalEstimacao) : Observable<any> => {
    let url = `${this.USUARIO_SERVICE_URL}/animal-estimacao`;
    return this.http.post(url, animalEstimacao, this.httpOptions)
    .pipe(
      tap(_ => this.logger.info(`Request feito a ${url}`)),
      catchError(this.handleError<AnimalEstimacao>('post'))
      );
  }

  atualizarAnimalEstimacao = (id:number, animalEstimacao:AnimalEstimacao) : Observable<any> => {
    let url = `${this.USUARIO_SERVICE_URL}/animal-estimacao/${id}`;
    return this.http.put(url, animalEstimacao, this.httpOptions)
    .pipe(
      tap(_=> this.logger.info(`Request feito a ${url}`)),
      catchError(this.handleError<AnimalEstimacao>('put'))
    );
  }

  removerAnimalEstimacao = (id:number) : Observable<any> => {
    let url = `${this.USUARIO_SERVICE_URL}/animal-estimacao/${id}`;
    return this.http.delete(url, this.httpOptions)
    .pipe(
      tap(_=> this.logger.info(`Request feito a ${url}`)),
      catchError(this.handleError<AnimalEstimacao>('put'))
    );
  }

  buscarTiposAnimalEstimacao = () : Observable<any> => {
    let url = `${this.USUARIO_SERVICE_URL}/animal-estimacao/tipos`;
    return this.http.get(url, this.httpOptions)
    .pipe(
      tap(_=> this.logger.info(`Request feito a ${url}`)),
      catchError(this.handleError<TipoAnimal[]>('put'))
    );
  }
}
