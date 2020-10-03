import { Prestador } from './prestador';
import { Servico } from './servico';

export interface ServicoDetalhado {
    id?: number, 
    descricao: string,
    tipo: Servico,
    prestador: Prestador
}
