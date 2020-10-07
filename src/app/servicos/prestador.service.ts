import { Injectable } from '@angular/core';
import { environment } from 'src/environments/environment';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { NGXLogger } from 'ngx-logger';
import { Observable, of } from 'rxjs';
import { Prestador } from '../interfaces/prestador';
import { usuariosMock } from '../mocks/usuarioMock';
import { TipoPessoa } from '../enum/tipo-pessoa.enum';
import { ServicoDetalhado } from '../interfaces/servico-detalhado';
import { servicos } from '../mocks/servico-detalhado-mock';
import { catchError, tap } from 'rxjs/operators';

@Injectable({
  providedIn: 'root'
})
export class PrestadorService {
  // prestadores:Prestador[] = ([...usuariosMock.filter(usuario => usuario.tipo === TipoPessoa.PRESTADOR_AUTONOMO)] as Prestador[]);

  // constructor(){}
  
  // buscaPrestador = (id:number):Observable<Prestador> => {
  //   let prestador = this.prestadores.find(el => el.id === id);
  //   return of(prestador);
  // }

  // adicionarServico = (id:number, servico:ServicoDetalhado): Observable<Prestador> => {
  //   let prestador = this.prestadores.find(el => el.id === id);
  //   prestador.servicosDetalhados.push(servico);
  //   this.prestadores = this.prestadores.map(el => el.id === prestador.id ? prestador : el);
  //   return of(prestador);
  // }
  
  // editaPrestador = (id:number, prestador:Prestador) :Observable<Prestador> => {
  //   let prestadorDb = this.prestadores.find(el => el.id === id);
  //   prestador.login = prestadorDb.login;
  //   this.prestadores = this.prestadores.map(el => el.id === prestador.id ? prestador : el);
  //   return this.buscaPrestador(id);
  // }

  // removeServico = (id:number, idServico:number): Observable<any> => {
  //   let prestador = this.prestadores.find(el => el.id === id);
  //   prestador.servicosDetalhados = prestador.servicosDetalhados.filter(el => el.id !== idServico);
  //   this.prestadores = this.prestadores.map(el => el.id === prestador.id ? prestador : el);
  //   return this.buscaPrestador(id);
  // }
  public PRESTADOR_SERVICE_URL = `${environment.API_URL}/prestador`;

  httpOptions = {
    headers: new HttpHeaders({'Content-type': 'application/json'})
  }

  constructor(private http:HttpClient, 
              private logger: NGXLogger) { }
  buscaPrestador = (id:number): Observable<Prestador> => {
    const url = `${this.PRESTADOR_SERVICE_URL}/${id}`;
    return this.http.get<Prestador>(url)
    .pipe(
      tap(_ => this.logger.info(`Request feito a ${url}`)),
      catchError(this.handleError<Prestador>(`Falha em requisição a ${url}`))
    );
  }
  adicionarServico = (id:number, servico:ServicoDetalhado): Observable<Prestador> => {
    console.log(id, servico);
    const url = `${this.PRESTADOR_SERVICE_URL}/${id}/servicoDetalhado`;
    return this.http.post<Prestador>(url, servico, this.httpOptions)
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
  editaPrestador = (id:number, prestador:Prestador) :Observable<Prestador> => {
    const url = `${this.PRESTADOR_SERVICE_URL}/${id}`;
    return this.http.put<Prestador>(url, prestador, this.httpOptions)
    .pipe(
      tap(_ => this.logger.info(`Request feito a ${url}`)),
      catchError(this.handleError<Prestador>(`Falha em requisição a ${url}`))
    )
  }

  removeServico = (id:number, idServico:number): Observable<any> => {
    const url = `${this.PRESTADOR_SERVICE_URL}/${id}/servicoDetalhado/${idServico}`;
    return this.http.delete<Prestador>(url, this.httpOptions)
    .pipe(
      tap(_ => this.logger.info(`Request feito a ${url}`)),
      catchError(this.handleError<Prestador>(`Falha em requisição a ${url}`))
    )
  }


}
