import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { NGXLogger } from 'ngx-logger';
import { Observable, of, throwError } from 'rxjs';
import { catchError, tap } from 'rxjs/operators';
import { JwtHelper } from '../util/jwt-helper';

@Injectable({
  providedIn: 'root'
})
export class HttpHandlerService {
  private httpOptions = {
    headers: new HttpHeaders({ 'Content-type' : 'application/json' }),
    responseType: 'text' as 'json'
  }

  constructor(private http: HttpClient, 
              private logger:NGXLogger,
              private jwtHelper:JwtHelper) { }

  
  doGet<T>(url:string, accessToken?:string):Observable<T> {
    const headers = this.montaHeader(accessToken);
    return this.http.get<T>(url, headers)
    .pipe(
      tap(_ => this.logger.info(`Request feito a ${url}`)),
      catchError(({error}) => {
        this.handleError<T>(`Erro em requisição a ${url}`);
        return throwError(error);
      })
    );
  }

  doPost<T>(url:string, reqBody:any, accessToken?:string):Observable<T> {
    const headers = this.montaHeader(accessToken);
    return this.http.post<T>(url, reqBody, headers)
    .pipe(
      tap(_ => this.logger.info(`Request feito a ${url}`)),
      catchError(({error}) => {
        this.handleError<T>(`Falha em requisição a ${url}`);
        return throwError(error)
      })
    );
  }

  doPut<T>(url:string, reqBody:any, accessToken?:string):Observable<T> {
    const headers = this.montaHeader(accessToken);
    this.http.get(url, headers).pipe()
    return this.http.put<T>(url, reqBody, headers)
    .pipe(
      tap(_ => this.logger.info(`Request feito a ${url}`)),
      catchError(({error}) => {
        this.handleError<T>(`Falha em requisição feita a ${url}`);
        return throwError(error);
      })
    );
  }

  doDelete<T>(url:string, accessToken?:string):Observable<T> {
    const headers = this.montaHeader(accessToken);
    return this.http.delete<T>(url, headers)
    .pipe(
      tap(_ => this.logger.info(`Request feito a ${url}`)),
      catchError(({error}) => {
        this.handleError<T>(`Falha em requisição a ${url}`);
        return throwError(error);
      })
    );
    return null;
  }

  private montaHeader(accessToken?:string) {
    if(!accessToken) {
      return this.httpOptions;
    }
    return this.jwtHelper.constroiHeaders(accessToken);
  }
  private handleError<T> (mensagem: string, result?: T) {
    return (error:any) : Observable<T> => {
      this.logger.error(mensagem);
      return of(result as T);
    }
  }
}