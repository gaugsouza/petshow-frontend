import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { NGXLogger } from 'ngx-logger';
import { Observable, of } from 'rxjs';
import { catchError, tap } from 'rxjs/operators';
import { environment } from 'src/environments/environment';
import { ServicoDetalhado } from '../interfaces/servico-detalhado';
import { SERVICOS } from '../util/tipo-servico';
import {Servico} from '../interfaces/servico';
@Injectable({
  providedIn: 'root'
})
export class ServicosService {
  public SERVICOS_SERVICE_URL = `${environment.API_URL}/servico-detalhado`;

  constructor(private http:HttpClient, 
    private logger:NGXLogger) { }

  buscarServicosDetalhadosPorTipo = (id:number): Observable<ServicoDetalhado[]>=>{
    const url = `${this.SERVICOS_SERVICE_URL}/tipo-servico/${id}`;
    return this.http.get<ServicoDetalhado[]>(url)
    .pipe(
      tap(_ => this.logger.info(`Request feito a ${url}`)),
      catchError(this.handleError<ServicoDetalhado[]>(`Falha em requisição feita a ${url}`))
    );
  }

  private handleError<T> (mensagem: string, result?: T) {
    return (error:any) : Observable<T> => {
      this.logger.error(mensagem);
      return of(result as T);
    }
  }

  getTipos = (): Servico[] => SERVICOS
}
