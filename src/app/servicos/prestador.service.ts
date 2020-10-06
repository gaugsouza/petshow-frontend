import { Injectable } from '@angular/core';
import { environment } from 'src/environments/environment';
import { HttpClient } from '@angular/common/http';
import { NGXLogger } from 'ngx-logger';
import { Observable, of } from 'rxjs';
import { Prestador } from '../interfaces/prestador';
import { usuariosMock } from '../mocks/usuarioMock';
import { TipoPessoa } from '../enum/tipo-pessoa.enum';
import { ServicoDetalhado } from '../interfaces/servico-detalhado';
import { servicos } from '../mocks/servico-detalhado-mock';

@Injectable({
  providedIn: 'root'
})
export class PrestadorService {
  prestadores:Prestador[] = ([...usuariosMock.filter(usuario => usuario.tipo === TipoPessoa.PRESTADOR_AUTONOMO)] as Prestador[]);

  constructor(){}
  
  buscaPrestador = (id:number):Observable<Prestador> => {
    let prestador = this.prestadores.find(el => el.id === id);
    return of(prestador);
  }

  adicionarServico = (id:number, servico:ServicoDetalhado): Observable<Prestador> => {
    let prestador = this.prestadores.find(el => el.id === id);
    prestador.servicosDetalhados.push(servico);
    this.prestadores = this.prestadores.map(el => el.id === prestador.id ? prestador : el);
    return of(prestador);
  }
  
  editaPrestador = (id:number, prestador:Prestador) :Observable<Prestador> => {
    let prestadorDb = this.prestadores.find(el => el.id === id);
    prestador.login = prestadorDb.login;
    this.prestadores = this.prestadores.map(el => el.id === prestador.id ? prestador : el);
    return this.buscaPrestador(id);
  }
  // public PRESTADOR_SERVICE_URL = `${environment.API_URL}/prestador`;

  // constructor(private http:HttpClient, 
  //             private logger: NGXLogger) { }
  // buscaPrestador = (id:number): Observable<Prestador> => {
  //   return null;
  // }
  // adicionarServico = (id:number, servico:ServicoDetalhado): Observable<Prestador> => {
  // return null;
  // }
  // private handleError<T> (mensagem: string, result?: T) {
  //   return (error:any) : Observable<T> => {
  //     this.logger.error(mensagem);
  //     return of(result as T);
  //   }
  // }
  // editaPrestador = (id:number, prestador:Prestador) :Observable<Prestador> => {
  //   return null;
  // }

  


}
