import { Injectable } from '@angular/core';
import { environment } from 'src/environments/environment';
import { HttpHeaders, HttpClient } from '@angular/common/http';
import { Observable, of, throwError } from 'rxjs';
import { catchError, tap } from 'rxjs/operators';
import { Usuario } from '../interfaces/usuario';
import { NGXLogger } from 'ngx-logger';
import { Login } from '../interfaces/login';
import { AnimalEstimacao } from '../interfaces/animalEstimacao';
import { TipoAnimal } from '../enum/TipoAnimal';
import { JwtHelper } from '../util/jwt-helper';
import { Cliente } from '../interfaces/cliente';

@Injectable({
  providedIn: 'root'
})
export class UsuarioService {
  public USUARIO_SERVICE_URL = `${environment.API_URL}/cliente`;

  constructor(private http:HttpClient, 
              private logger: NGXLogger,
              private jwtHelper: JwtHelper){}

  getUsuario = (token:string) : Observable<Usuario> => {
    let id = this.jwtHelper.recuperaIdToken(token);
    const headers = this.jwtHelper.constroiHeaders(token);
    const url = `${this.USUARIO_SERVICE_URL}/${id}`;    

    return this.http.get<Usuario>(url, headers)
    .pipe(
    tap(_ => this.logger.info(`Request feito a ${url}`)),
    catchError(this.handleError<Usuario>(`Falha em requisição feita a ${url}`)))       
  }

  buscarUsuario = (id:number) : Observable<Usuario> => {
    const url = `${this.USUARIO_SERVICE_URL}/${id}`;    

    return this.http.get<Usuario>(url)
    .pipe(
    tap(_ => this.logger.info(`Request feito a ${url}`)),
    catchError(this.handleError<Usuario>(`Falha em requisição feita a ${url}`)))       
  }

  atualizaUsuario = (usuario:Usuario, token:string) : Observable<Usuario> => {
    let url = `${this.USUARIO_SERVICE_URL}/${usuario.id}`
    const headers = this.jwtHelper.constroiHeaders(token);

    return this.http.put<Usuario>(url, usuario, headers)
    .pipe(
      tap(_ => this.logger.info(`Request feito a ${this.USUARIO_SERVICE_URL}`)),
      catchError(err => {
        this.handleError<Usuario>('update');
        return throwError(err);
      })
    );
  } 

  adicionarAnimalEstimacao = (animalEstimacao:AnimalEstimacao, token:string) : Observable<any> => {
    let url = `${this.USUARIO_SERVICE_URL}/animal-estimacao`;
    const headers = this.jwtHelper.constroiHeaders(token);
    console.log(animalEstimacao)
    return this.http.post(url, animalEstimacao, headers)
    .pipe(
      tap(_ => this.logger.info(`Request feito a ${url}`)),
      catchError(this.handleError<AnimalEstimacao>('post'))
      );
  }

  atualizarAnimalEstimacao = (id:number, animalEstimacao:AnimalEstimacao, token:string) : Observable<any> => {
    let url = `${this.USUARIO_SERVICE_URL}/animal-estimacao/${id}`;
    const headers = this.jwtHelper.constroiHeaders(token);
    return this.http.put(url, animalEstimacao, headers)
    .pipe(
      tap(_=> this.logger.info(`Request feito a ${url}`)),
      catchError(this.handleError<AnimalEstimacao>('put'))
    );
  }

  removerAnimalEstimacao = (id:number, token:string) : Observable<any> => {
    let donoId = this.jwtHelper.recuperaIdToken(token);
    let url = `${this.USUARIO_SERVICE_URL}/${donoId}/animal-estimacao/${id}`;
    const headers = this.jwtHelper.constroiHeaders(token);
    return this.http.delete(url, headers)
    .pipe(
      tap(_=> this.logger.info(`Request feito a ${url}`)),
      catchError(this.handleError<AnimalEstimacao>('put'))
    );
  }

  buscarTiposAnimalEstimacao = (token:string) : Observable<any> => {
    let url = `${this.USUARIO_SERVICE_URL}/animal-estimacao/tipos`;
    const headers = this.jwtHelper.constroiHeaders(token);
    return this.http.get(url, headers)
    .pipe(
      tap(_=> this.logger.info(`Request feito a ${url}`)),
      catchError(this.handleError<TipoAnimal[]>('put'))
    );
  } 

  private handleError<T> (mensagem: string, result?: T) {
    return (error:any) : Observable<T> => {
      this.logger.error(mensagem);
      return of(result as T);
    }
  }
}
