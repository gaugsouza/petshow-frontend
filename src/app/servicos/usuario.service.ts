import { Injectable } from '@angular/core';
import { environment } from 'src/environments/environment';
import { HttpHeaders, HttpClient } from '@angular/common/http';
import { Observable, of } from 'rxjs';
import { catchError, map, tap } from 'rxjs/operators';
import { Usuario } from '../interfaces/usuario';
import { NGXLogger } from 'ngx-logger';
import { LocalStorageService } from './local-storage.service';

@Injectable({
  providedIn: 'root'
})
export class UsuarioService {
  private usuarioServiceUrl = `${environment.API_URL}contas`;
  httpOptions = {
    headers: new HttpHeaders({ 'Content-type' : 'application/json'})
  }

  constructor(private http:HttpClient, 
              private logger: NGXLogger,
              private storageService:LocalStorageService) { }

  

  getUsuario = (id:number): Observable<Usuario> => {
    const url = `${this.usuarioServiceUrl}/${id}`;
    return this.http.get<Usuario>(url)
    .pipe(
      tap(_ => this.logger.info(`Request feito a ${url}`)),
      catchError(this.handleError<Usuario>(`Falha em requisição feita a ${url}`))
    );
  }

  private handleError<T> (mensagem: string, result?: T) {
    return (error:any) : Observable<T> => {
      this.logger.error(mensagem);
      return of(result as T);
    }
  }

  buscaUsuarioStorage = () => {
    return this.storageService.getItem('usuario');
  }
}
