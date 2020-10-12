import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { NGXLogger } from 'ngx-logger';
import { Observable, of } from 'rxjs';
import { tap, catchError } from 'rxjs/operators';

export interface Estado {
  id:number,
  sigla: string,
  nome: string
}
export interface Cidade {
  id:number,
  nome: string
}
@Injectable({
  providedIn: 'root'
})
export class ConsultaEstadosService {
  private API_BASE_URL = "https://servicodados.ibge.gov.br/api/v1/localidades";

  constructor(private http:HttpClient,
              private logger:NGXLogger) { }


  getEstados():Observable<any> {
    const URL = `${this.API_BASE_URL}/estados/`
    return this.http.get<any>(URL)
    .pipe(
      tap(_ => this.logger.info(`Request feito a ${URL}`)),
      catchError(this.handleError<any>(`Falha em requisição feita a ${URL}`))
    );
  }

  private handleError<T> (mensagem: string, result?: T) {
    return (error:any) : Observable<T> => {
      this.logger.error(mensagem);
      return of(result as T);
    }
  }

  getCidades(uf:string):Observable<any> {
    const URL = `${this.API_BASE_URL}/estados/${uf}/municipios`;
    return this.http.get(URL)
    .pipe(
      tap(_ => this.logger.info(`Request feito a ${URL}`),
      catchError(this.handleError<any>(`Erro em requisição a ${URL}`)))
    );
  }

}
