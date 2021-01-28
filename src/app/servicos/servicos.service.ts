import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { HttpHandlerService } from 'src/app/servicos/http-handler.service';
import { SERVICO_DETALHADO_URL, TIPO_SERVICO_URL, PRESTADOR_SERVICE_URL } from 'src/app/util/url';
import { FiltroServicos } from '../interfaces/filtro-servicos';

@Injectable({
  providedIn: 'root',
})
export class ServicosService {
  constructor(private httpHandler:HttpHandlerService) {}

  buscarServicosDetalhadosPorTipo = (id:number, pagina:number,
    quantidadeItens:number, filtro?:FiltroServicos): Observable<any> => {
    const filtroStr = this.geraFiltroString(filtro);
    const URL = `${SERVICO_DETALHADO_URL}/tipo-servico/${id}?pagina=${pagina}&quantidadeItens=${quantidadeItens}${filtroStr}`;
    return this.httpHandler.doGet<any>(URL);
  }

  geraFiltroString(filtro:FiltroServicos) {
    if(!filtro) {
      return '';
    }
    return Object.keys(filtro)
            .filter(key => filtro[key] != null)
            .reduce((filtroStr, key) => `${filtroStr}&${key}=${filtro[key]}`, '');
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

  buscarPorPrestadorIdEServicoId(prestadorId:number, servicoDetalhadoId:number, token?:string) : Observable<any> {
    const URL = `${PRESTADOR_SERVICE_URL}/${prestadorId}/servico-detalhado/${servicoDetalhadoId}`;
    return this.httpHandler.doGet<any>(URL, token);
  }
}
