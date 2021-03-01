import { Injectable } from '@angular/core';
import { HttpHandlerService } from './http-handler.service';
import { Observable } from 'rxjs';
import { PAGAMENTO_URL } from '../util/url';

@Injectable({
  providedIn: 'root'
})
export class PagamentoService {
  constructor(private httpHandler:HttpHandlerService) { }

  recuperaPreference(agendamentoId:number, clienteId:number, token:string): Observable<any> {
    const URL = `${PAGAMENTO_URL}/agendamento/${agendamentoId}/cliente/${clienteId}/preference`;
    return this.httpHandler.doGet<any>(URL, token);
  }
}
