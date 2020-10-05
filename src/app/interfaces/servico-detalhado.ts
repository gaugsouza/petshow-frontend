import { Prestador } from './prestador';
import { Servico } from './servico';

export interface ServicoDetalhado {
    id?: number, 
    descricao: string,
    preco: number,
    tipo: Servico,
    prestador: Prestador
}
