import { Injectable } from '@angular/core';
import { Observable, of } from 'rxjs';
import { catchError, tap } from 'rxjs/operators';
import { environment } from 'src/environments/environment';
import { ServicoDetalhado } from '../interfaces/servico-detalhado';
import { SERVICOS } from '../util/tipo-servico';
import {Servico} from '../interfaces/servico';
import { HttpHandlerService } from 'src/app/servicos/http-handler.service';
@Injectable({
  providedIn: 'root'
})
export class ServicosService {
  public SERVICOS_SERVICE_URL = `${environment.API_URL}/servico-detalhado`;
  public PRESTADOR_SERVICE_URL = `${environment.API_URL}/prestador`;
  public SERVICOS_URL = `${environment.API_URL}/servico`;

  constructor(private httpHandler:HttpHandlerService) {}

  buscarServicosDetalhadosPorTipo = (id:number, pagina:number, quantidadeItens:number): Observable<any>=>{
    const URL = `${this.SERVICOS_SERVICE_URL}/tipo-servico/${id}?pagina=${pagina}&quantidadeItens=${quantidadeItens}`;
    return this.httpHandler.doGet<any>(URL);
  }

  getTipos(): Observable<any> {
    const URL = this.SERVICOS_URL;
    return this.httpHandler.doGet<any>(URL);
  }

  buscarServicosDetalhadosPorPrestador(prestadorId:number, pagina:number, quantidadeItens:number, token:string) : Observable<any> {
    const URL = `${this.PRESTADOR_SERVICE_URL}/${prestadorId}/servico-detalhado?pagina=${pagina}&quantidadeItens=${quantidadeItens}`;
    return this.httpHandler.doGet<any>(URL, token);
  }
}
