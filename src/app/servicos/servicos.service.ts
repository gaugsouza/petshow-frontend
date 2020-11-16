import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { HttpHandlerService } from 'src/app/servicos/http-handler.service';
import { SERVICOS_SERVICE_URL, SERVICOS_URL } from 'src/app/util/url';

@Injectable({
  providedIn: 'root'
})
export class ServicosService {
  constructor(private httpHandler:HttpHandlerService) {}

  buscarServicosDetalhadosPorTipo = (id:number): Observable<any>=>{
    const URL = `${SERVICOS_SERVICE_URL}/tipo-servico/${id}`;
    return this.httpHandler.doGet<any>(URL);
  }

  getTipos(): Observable<any> {
    const URL = SERVICOS_URL;
    return this.httpHandler.doGet<any>(URL);
  }
}
