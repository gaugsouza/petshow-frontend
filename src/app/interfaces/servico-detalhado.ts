import { Servico } from './servico';
import { Prestador } from './prestador';
import { Avaliacao } from './avaliacao';

export interface ServicoDetalhado {
    id?:number,
    preco?:number,
    tipo?:Servico,
    prestador?:Prestador,
    avaliacoes?:Avaliacao[]
}
