import { Servico } from './servico';
import { Avaliacao } from './avaliacao';
import { Prestador } from './prestador';

export interface ServicoDetalhado {
    id?:number,
    preco?:number,
    tipo?:Servico,
    prestador?:Prestador,
    avaliacoes?:Avaliacao[]
    descricao?: string,
}
