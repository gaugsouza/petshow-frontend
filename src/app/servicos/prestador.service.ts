import { Injectable } from '@angular/core';
import { environment } from 'src/environments/environment';
import { HttpHeaders, HttpClient } from '@angular/common/http';
import { Observable, of, throwError } from 'rxjs';
import { catchError, map, tap } from 'rxjs/operators';
import { Prestador } from '../interfaces/prestador';
import { NGXLogger } from 'ngx-logger';
import { LocalStorageService } from './local-storage.service';
import { usuariosMock } from '../mocks/usuarioMock';
import { Login } from '../interfaces/login';

@Injectable({
  providedIn: 'root'
})
export class PrestadorService {
  public USUARIO_SERVICE_URL = `${environment.API_URL}prestador`;

  httpOptions = {
    headers: new HttpHeaders({ 'Content-type' : 'application/json'})
  }

  constructor(  private http:HttpClient,  //possibilita fazer requisições
                private logger: NGXLogger,  //faz logs
                private storageService:LocalStorageService) { } //tá criando o LocalStorage,  coloca o objeto dentro do local e aí ele pode ser acessado daí

    private handleError<T> (mensagem: string, result?: T) {
      return (error:any) : Observable<T> => {
        this.logger.error(mensagem);
        return of(result as T);
      }
    }

    getPrestador = (id:number): Observable<Prestador> =>{
      const url = `${this.USUARIO_SERVICE_URL}/${id}`;
      return this.http.get<Prestador>(url)
      .pipe(
        tap(_ => this.logger.info(`Request feito a ${url}`)),
        catchError(this.handleError<Prestador>(`Falha em requisição feita a ${url}`))
      ); 
    }

    atualizaPrestador = (id:number , prestador:Prestador) : Observable<Prestador> => {
      console.log(prestador);
      return this.http.put<Prestador>(`${this.USUARIO_SERVICE_URL}/${id}`, prestador, this.httpOptions) //faz req do tipo put, pra url de cliente que tinha método anotado com put,
      .pipe(
        tap(_ => this.logger.info(`Request feito a ${this.USUARIO_SERVICE_URL}/${id}`, prestador)), //se deu certo, faz log falando qu fez a req praquela url mandando corpo com usuario e mandando as opções de header
        catchError(err => {
          this.handleError<Prestador>('update'); //da um log de erro
          return throwError(err); //lança um observável com erro, e esse observavel vai ser usado no componente pra retornar a msg de erro
        })
      );
    }
    
    buscaPorLogin = (login: Login) : Observable<any> => {
      let url = `${this.USUARIO_SERVICE_URL}/login`;
      return this.http.post(url, login, this.httpOptions)
      .pipe(
        tap(_ => this.logger.info(`Request feito a ${url}`)),
        catchError(this.handleError<Prestador>('login'))
      );
    }
  
    
    criaPrestador = (prestador:Prestador) : Observable<any> => {
      let url = `${this.USUARIO_SERVICE_URL}`;
      return this.http.post(url, prestador, this.httpOptions)
      .pipe(
        tap(_ => this.logger.info(`Request feito a ${url}`)),
        catchError(this.handleError<Prestador>('prestador'))
      );
    }


    deletaPrestador = (id:number) : Observable<any> => {
      return this.http.delete(`${this.USUARIO_SERVICE_URL}/${id}`, this.httpOptions) //faz req do tipo put, pra url de cliente que tinha método anotado com put,
      .pipe(
        tap(_ => this.logger.info(`Request feito a ${this.USUARIO_SERVICE_URL}/${id}`)), //se deu certo, faz log falando qu fez a req praquela url mandando corpo com usuario e mandando as opções de header
        catchError(err => {
          this.handleError<Prestador>('delete'); //da um log de erro
          return throwError(err); //lança um observável com erro, e esse observavel vai ser usado no componente pra retornar a msg de erro
        })
      );
    }
    

    

}
