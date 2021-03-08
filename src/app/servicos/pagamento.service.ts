import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { HttpHandlerService } from 'src/app/servicos/http-handler.service';
import { PAGAMENTO_URL } from 'src/app/util/url';

@Injectable({
  providedIn: 'root',
})
export class PagamentoService {
  constructor(private httpHandler:HttpHandlerService) { }

  recuperaPreference(agendamentoId:number, clienteId:number, token:string): Observable<any> {
    const URL = `${PAGAMENTO_URL}/agendamento/${agendamentoId}/cliente/${clienteId}/preference`;
    return this.httpHandler.doGet<any>(URL, token);
  }
}
