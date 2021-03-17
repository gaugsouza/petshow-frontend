import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { NGXLogger } from 'ngx-logger';
import { Observable, of, throwError } from 'rxjs';
import { catchError, tap } from 'rxjs/operators';
import { JwtHelper } from '../util/jwt-helper';

@Injectable({
  providedIn: 'root',
})
export class HttpHandlerService {
  private httpOptions = {
    headers: new HttpHeaders({
      'Content-type': 'application/json',
      'Strict-Transport-Security': 'max-age=31536000; includeSubDomains',
      'Content-Security-Policy': 'Content-Security-Policy: default-src https://petshow-backend.herokuapp.com; default-src http://localhost:4200',
      'X-Frame-Options': 'SAMEORIGIN',
      'X-Content-Type-Options': 'nosniff always',
      'Referrer-Policy': 'no-referrer',
      'Permissions-Policy': 'geolocation=(self "https://petshow-backend.herokuapp.com" "http://localhost:4200")',
    }),
    responseType: 'text' as 'json',
  }

  constructor(private http: HttpClient,
              private logger:NGXLogger,
              private jwtHelper:JwtHelper) { }

  doGet<T>(url:string, accessToken?:string):Observable<T> {
    const headers = this.montaHeader(accessToken);
    return this.http.get<T>(url, headers)
      .pipe(
        tap(() => this.logger.info(`Request feito a ${url}`)),
        catchError(({ error }) => {
          this.handleError<T>(`Erro em requisição a ${url}`);
          return throwError(error);
        }),
      );
  }

  doPost<T>(url:string, reqBody:any, accessToken?:string):Observable<T> {
    const headers = this.montaHeader(accessToken);
    return this.http.post<T>(url, reqBody, headers)
      .pipe(
        tap(() => this.logger.info(`Request feito a ${url}`)),
        catchError(({ error }) => {
          this.handleError<T>(`Falha em requisição a ${url}`);
          return throwError(error);
        }),
      );
  }

  doPut<T>(url:string, reqBody:any, accessToken?:string):Observable<T> {
    const headers = this.montaHeader(accessToken);
    this.http.get(url, headers).pipe();
    return this.http.put<T>(url, reqBody, headers)
      .pipe(
        tap(() => this.logger.info(`Request feito a ${url}`)),
        catchError(({ error }) => {
          this.handleError<T>(`Falha em requisição feita a ${url}`);
          return throwError(error);
        }),
      );
  }

  doDelete<T>(url:string, accessToken?:string):Observable<T> {
    const headers = this.montaHeader(accessToken);
    return this.http.delete<T>(url, headers)
      .pipe(
        tap(() => this.logger.info(`Request feito a ${url}`)),
        catchError(({ error }) => {
          this.handleError<T>(`Falha em requisição a ${url}`);
          return throwError(error);
        }),
      );
  }

  doPatch<T>(url:string, accessToken?:string, body:any = null):Observable<T> {
    const headers = this.montaHeader(accessToken);
    return this.http.patch<T>(url, body, headers)
      .pipe(
        tap(() => this.logger.info(`Request feito a ${url}`)),
        catchError(({ error }) => {
          this.handleError<T>(`Falha em requisição a ${url}`);
          return throwError(error);
        }),
      );
  }

  private montaHeader(accessToken?:string) {
    if (!accessToken) {
      return this.httpOptions;
    }
    return this.jwtHelper.constroiHeaders(accessToken);
  }

  private handleError<T>(mensagem: string, result?: T) {
    return (): Observable<T> => {
      this.logger.error(mensagem);
      return of(result as T);
    };
  }
}
