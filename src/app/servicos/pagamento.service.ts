import { Injectable } from '@angular/core';
import { HttpHandlerService } from './http-handler.service';
import { Observable } from 'rxjs';
import { PAGAMENTO_URL } from '../util/url';
import { Agendamento } from '../interfaces/agendamento';

@Injectable({
  providedIn: 'root'
})
export class PagamentoService {
  constructor(private httpHandler:HttpHandlerService) { }

  geraPreference(agendamento:Agendamento, token:string): Observable<any> {
    const URL = `${PAGAMENTO_URL}/preference`;
    return this.httpHandler.doPost<any>(URL, agendamento, token);
  }
}
