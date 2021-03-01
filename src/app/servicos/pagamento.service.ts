import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { HttpHandlerService } from 'src/app/servicos/http-handler.service';
import { PAGAMENTO_URL } from 'src/app/util/url';
import { Agendamento } from 'src/app/interfaces/agendamento';

@Injectable({
  providedIn: 'root',
})
export class PagamentoService {
  constructor(private httpHandler:HttpHandlerService) { }

  geraPreference(agendamento:Agendamento, token:string): Observable<any> {
    const URL = `${PAGAMENTO_URL}/preference`;
    return this.httpHandler.doPost<any>(URL, agendamento, token);
  }
}
