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
import { Endereco } from '../interfaces/endereco';
import { TipoPessoa } from '../enum/tipo-pessoa.enum';
import { ServicoDetalhado } from '../interfaces/servico-detalhado';
import { servicos } from '../mocks/servico-detalhado-mock';

@Injectable({
  providedIn: 'root'
})
export class PrestadorService {
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


  prestadores:Prestador[] = [];
  cadastrarUsuario = (prestador:Prestador) : Observable<any> => {
    prestador.id = this.prestadores.length + 1
    this.prestadores = [...this.prestadores, prestador]
    return of(prestador);
  }



    // getPrestador = (id:number): Observable<Prestador> =>{
    //   const url = `${this.PRESTADOR_SERVICE_URL}/${id}`;
    //   return this.http.get<Prestador>(url)
    //   .pipe(
    //     tap(_ => this.logger.info(`Request feito a ${url}`)),
    //     catchError(this.handleError<Prestador>(`Falha em requisição feita a ${url}`))
    //   ); 
    // }

    // atualizaPrestador = (id:number , prestador:Prestador) : Observable<Prestador> => {
    //   console.log(prestador);
    //   return this.http.put<Prestador>(`${this.PRESTADOR_SERVICE_URL}/${id}`, prestador, this.httpOptions) //faz req do tipo put, pra url de cliente que tinha método anotado com put,
    //   .pipe(
    //     tap(_ => this.logger.info(`Request feito a ${this.PRESTADOR_SERVICE_URL}/${id}`, prestador)), //se deu certo, faz log falando qu fez a req praquela url mandando corpo com usuario e mandando as opções de header
    //     catchError(err => {
    //       this.handleError<Prestador>('update'); //da um log de erro
    //       return throwError(err); //lança um observável com erro, e esse observavel vai ser usado no componente pra retornar a msg de erro
    //     })
    //   );
    // }

  


    // deletaPrestador = (id:number) : Observable<any> => {
    //   return this.http.delete(`${this.PRESTADOR_SERVICE_URL}/${id}`, this.httpOptions) //faz req do tipo put, pra url de cliente que tinha método anotado com put,
    //   .pipe(
    //     tap(_ => this.logger.info(`Request feito a ${this.PRESTADOR_SERVICE_URL}/${id}`)), //se deu certo, faz log falando qu fez a req praquela url mandando corpo com usuario e mandando as opções de header
    //     catchError(err => {
    //       this.handleError<Prestador>('delete'); //da um log de erro
    //       return throwError(err); //lança um observável com erro, e esse observavel vai ser usado no componente pra retornar a msg de erro
    //     })
    //   );
    // }


}
