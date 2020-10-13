import { Injectable } from '@angular/core';
import { environment } from 'src/environments/environment';
import { HttpHeaders, HttpClient } from '@angular/common/http';
import { Observable, of, throwError } from 'rxjs';
import { catchError, tap } from 'rxjs/operators';
import { Prestador } from '../interfaces/prestador';
import { ServicoDetalhado } from '../interfaces/servico-detalhado';
import { JwtHelper } from '../util/jwt-helper';
import { NGXLogger } from 'ngx-logger';
import { LocalStorageService } from './local-storage.service';
import { usuariosMock } from '../mocks/usuarioMock';
import { Login } from '../interfaces/login';
import { Endereco } from '../interfaces/endereco';
import { TipoPessoa } from '../enum/tipo-pessoa.enum';
import { servicos } from '../mocks/servico-detalhado-mock';

@Injectable({
  providedIn: 'root'
})
export class PrestadorService {
  public PRESTADOR_SERVICE_URL = `${environment.API_URL}/prestador`;
  public ACESSO_URL = `${environment.API_URL}/acesso`

  private httpOptions = {
    headers: new HttpHeaders({ 'content-type': 'application/json'})
  }

  constructor(private http:HttpClient, 
              private logger: NGXLogger,
              private jwtHelper: JwtHelper) { }

  buscaPrestador = (id:number, token?:string): Observable<Prestador> => {
    const url = `${this.PRESTADOR_SERVICE_URL}/${id}`;
    const headers = !!token ? this.jwtHelper.constroiHeaders(token) : this.httpOptions;
    
    return this.http.get<Prestador>(url, headers)
    .pipe(
      tap(_ => this.logger.info(`Request feito a ${url}`)),
      catchError(this.handleError<Prestador>(`Falha em requisição a ${url}`))
    );
  }

  adicionarServico = (id:number, servico:ServicoDetalhado, token:string): Observable<Prestador> => {
    const url = `${this.PRESTADOR_SERVICE_URL}/${id}/servico-detalhado`;
    const headers = this.jwtHelper.constroiHeaders(token);

    return this.http.post<Prestador>(url, servico, headers)
    .pipe(
      tap(_ => this.logger.info(`Request feito a ${url}`)),
      catchError(this.handleError<Prestador>(`Falha em requisição a ${url}`))
    )
  }

  editaPrestador = (id:number, prestador:Prestador, token:string) :Observable<Prestador> => {
    const url = `${this.PRESTADOR_SERVICE_URL}/${id}`;
    const headers = this.jwtHelper.constroiHeaders(token);

    return this.http.put<Prestador>(url, prestador, headers)
    .pipe(
      tap(_ => this.logger.info(`Request feito a ${url}`)),
      catchError(this.handleError<Prestador>(`Falha em requisição a ${url}`))
    )
  }

  removeServico = (id:number, idServico:number, token:string): Observable<any> => {
    const url = `${this.PRESTADOR_SERVICE_URL}/${id}/servico-detalhado/${idServico}`;
    const headers = this.jwtHelper.constroiHeaders(token);

    return this.http.delete<Prestador>(url, headers)
    .pipe(
      tap(_ => this.logger.info(`Request feito a ${url}`)),
      catchError(this.handleError<Prestador>(`Falha em requisição a ${url}`))
    )
  }

  private handleError<T> (mensagem: string, result?: T) {
    return (error:any) : Observable<T> => {
      this.logger.error(mensagem);
      return of(result as T);
    }
  }

  cadastrarUsuario = (prestador:Prestador) : Observable<any> => {
    let url = `${this.ACESSO_URL}/cadastro`;
    return this.http.post(url, prestador, this.httpOptions)
    .pipe(
      tap(_ => this.logger.info(`Request feito a ${url}`)),
      catchError(this.handleError<Prestador>('usuario'))
    );
  }
}
