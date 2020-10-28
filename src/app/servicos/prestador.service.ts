import { Injectable } from '@angular/core';
import { environment } from 'src/environments/environment';
import { HttpHeaders, HttpClient } from '@angular/common/http';
import { Observable, of } from 'rxjs';
import { catchError, tap } from 'rxjs/operators';
import { Prestador } from '../interfaces/prestador';
import { ServicoDetalhado } from '../interfaces/servico-detalhado';
import { JwtHelper } from '../util/jwt-helper';
import { NGXLogger } from 'ngx-logger';
import { HttpHandlerService } from 'src/app/servicos/http-handler.service';

@Injectable({
  providedIn: 'root'
})
export class PrestadorService {
  public PRESTADOR_SERVICE_URL = `${environment.API_URL}/prestador`;
  public ACESSO_URL = `${environment.API_URL}/acesso`

  constructor(private httpHandler:HttpHandlerService){}

  buscaPrestador(id:number, token?:string): Observable<any> {
    const URL = `${this.PRESTADOR_SERVICE_URL}/${id}`;
    return this.httpHandler.doGet<any>(URL, token);
  }

  adicionarServico(id:number, servico:ServicoDetalhado, token:string): Observable<Prestador> {
    const URL = `${this.PRESTADOR_SERVICE_URL}/${id}/servico-detalhado`;
    return this.httpHandler.doPost<Prestador>(URL, servico, token);
  }

  editaPrestador(id:number, prestador:Prestador, token:string): Observable<Prestador> {
    const URL = `${this.PRESTADOR_SERVICE_URL}/${id}`;
    return this.httpHandler.doPut<Prestador>(URL, prestador, token);
  }

  removeServico = (id:number, idServico:number, token:string): Observable<any> => {
    const URL = `${this.PRESTADOR_SERVICE_URL}/${id}/servico-detalhado/${idServico}`;
    return this.httpHandler.doDelete<Prestador>(URL, token);
  }

  cadastrarUsuario = (prestador:Prestador) : Observable<any> => {
    const URL = `${this.ACESSO_URL}/cadastro`;
    return this.httpHandler.doPost<Prestador>(URL, prestador);
  }
}
