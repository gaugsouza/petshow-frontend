import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { HttpHandlerService } from 'src/app/servicos/http-handler.service';
import { SERVICO_DETALHADO_URL, TIPO_SERVICO_URL, PRESTADOR_SERVICE_URL } from 'src/app/util/url';

@Injectable({
  providedIn: 'root',
})
export class ServicosService {
  constructor(private httpHandler:HttpHandlerService) {}

  buscarServicosDetalhadosPorTipo = (id:number, pagina:number,
    quantidadeItens:number): Observable<any> => {
    const URL = `${SERVICO_DETALHADO_URL}/tipo-servico/${id}?pagina=${pagina}&quantidadeItens=${quantidadeItens}`;
    return this.httpHandler.doGet<any>(URL);
  }

  getTipos(): Observable<any> {
    const URL = TIPO_SERVICO_URL;
    return this.httpHandler.doGet<any>(URL);
  }

  buscarServicosDetalhadosPorPrestador(prestadorId:number, pagina:number,
    quantidadeItens:number, token:string) : Observable<any> {
    const URL = `${PRESTADOR_SERVICE_URL}/${prestadorId}/servico-detalhado?pagina=${pagina}&quantidadeItens=${quantidadeItens}`;
    return this.httpHandler.doGet<any>(URL, token);
  }
}
