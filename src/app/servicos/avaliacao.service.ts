import { Injectable } from '@angular/core';
import { Observable, of } from 'rxjs';
import { ServicoDetalhado } from '../interfaces/servico-detalhado';
import { servicos } from '../mocks/servico-detalhado-mock';
import { Avaliacao } from '../interfaces/avaliacao';
import { Servico } from '../interfaces/servico';
import { Cliente } from '../interfaces/cliente';
import { usuariosMock } from '../mocks/usuarioMock';
import { environment } from 'src/environments/environment';
import { HttpHeaders, HttpClient } from '@angular/common/http';
import { NGXLogger } from 'ngx-logger';
import { tap, catchError } from 'rxjs/operators';

@Injectable({
  providedIn: 'root'
})
export class AvaliacaoService {
  private clientes:Cliente[] = usuariosMock;
  servicos: ServicoDetalhado[] = [...servicos];
  constructor(private http:HttpClient,
              private logger:NGXLogger) { }

  private AVALIACAO_SERVICE_URL = `${environment.API_URL}/prestador/idPrestador/servicoDetalhado/idServico/avaliacoes`;
  private SERVICO_DETALHADO_URL = `${environment.API_URL}/prestador/idPrestador/servicoDetalhado/idServico`;

  private httpOptions = {
    headers: new HttpHeaders({ 'content-type': 'application/json'})
  }


  buscaServicoAvaliadoPorId = (idServico:number, idPrestador?:number):Observable<ServicoDetalhado> => {
    const url = this.SERVICO_DETALHADO_URL.replace('idPrestador', idPrestador.toString()).replace('idServico', idServico.toString());

    return this.http.get<ServicoDetalhado>(url)
    .pipe(
      tap(_ => this.logger.info(`Request feito a ${url}`)),
      catchError(this.handleError<ServicoDetalhado>(`Falha em requisição feita a ${url}`))
    )
  }

  private handleError<T> (mensagem: string, result?: T) {
    return (error:any) : Observable<T> => {
      this.logger.error(mensagem);
      return of(result as T);
    }
  }

  adicionarAvaliacao = (avaliacao:Avaliacao, idServico?:number, idPrestador?:number):Observable<ServicoDetalhado> => {
    const url = this.AVALIACAO_SERVICE_URL.replace('idPrestador', idPrestador.toString()).replace('idServico', idServico.toString());

    return this.http.post(url, avaliacao, this.httpOptions)
    .pipe(
      tap(_ => this.logger.info(`Request feito a ${url}`)),
      catchError(this.handleError<ServicoDetalhado>('Add avaliação'))
    );
  }
}
