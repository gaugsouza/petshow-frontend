import { Injectable } from '@angular/core';
import { HttpHandlerService } from './http-handler.service';
import { Observable } from 'rxjs';
import { PAGAMENTO_URL } from '../util/url';
import { HttpHeaders } from '@angular/common/http';

@Injectable({
  providedIn: 'root'
})
export class PagamentoService {
  constructor(private httpHandler:HttpHandlerService) { }

  geraPreference(clienteId:number, agendamentoId:number, token:string): Observable<any> {
    const URL = `${PAGAMENTO_URL}/cliente/${clienteId}/agendamento/${agendamentoId}`;
    return this.httpHandler.doGet<any>(URL, token);
  }
}
