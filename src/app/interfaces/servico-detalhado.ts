import { Servico } from './servico';
import { Prestador } from './prestador';

export interface ServicoDetalhado {
    id?:number,
    preco:number,
    tipo:Servico,
    prestador:Prestador
}
