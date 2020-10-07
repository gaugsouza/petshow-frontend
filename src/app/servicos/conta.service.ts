import { Injectable } from '@angular/core';
import { usuariosMock } from '../mocks/usuarioMock';
import { Observable, of } from 'rxjs';
import { Usuario } from '../interfaces/usuario';
import { HttpClient } from '@angular/common/http';
import { environment } from 'src/environments/environment';
import { tap, catchError } from 'rxjs/operators';
import { NGXLogger } from 'ngx-logger';

@Injectable({
  providedIn: 'root'
})
export class ContaService {
  // usuarios = [...usuariosMock];
  // constructor() { }

  // buscarPorId = (id:number):Observable<Usuario> => {
  //   let usuario = this.usuarios.find(usuario => usuario.id === id);
  //   return of(usuario);
  // }
  CONTA_SERVICE_URL = `${environment.API_URL}/conta`;
  constructor(private http:HttpClient,
              private logger:NGXLogger) {}

  buscarPorId = (id:number):Observable<Usuario> => {
    const url = `${this.CONTA_SERVICE_URL}/${id}`;
    return this.http.get<Usuario>(url)
    .pipe(
      tap(_ => this.logger.info(`Requisição feita a ${url}`)),
      catchError(this.handleError<Usuario>(`Requisição feita a ${url}`))
    )
  }
  private handleError<T> (mensagem: string, result?: T) {
    return (error:any) : Observable<T> => {
      this.logger.error(mensagem);
      return of(result as T);
    }
  }

}
