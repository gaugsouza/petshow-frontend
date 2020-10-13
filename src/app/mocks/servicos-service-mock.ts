import { servicos } from './servico-detalhado-mock';
import { ServicoDetalhado } from '../interfaces/servico-detalhado';
import { Observable, of } from 'rxjs';

export class ServicosServiceMock {
    servicos: ServicoDetalhado[] = [...servicos];

    buscaServicosDetalhadosPorId = (idTipo:number):Observable<ServicoDetalhado> => {
        let servico = this.servicos.find(servico => servico.tipo.id === idTipo);
        return of(servico);
      }

}
