import { Servico } from 'src/app/interfaces/servico';
import { Avaliacao } from 'src/app/interfaces/avaliacao';
import { Prestador } from 'src/app/interfaces/prestador';
import { Adicional } from 'src/app/interfaces/adicional';

export interface ServicoDetalhado {
    id?:number,
    preco?:number,
    tipo?:Servico,
    prestador?:Prestador,
    avaliacoes?:Avaliacao[]
    descricao?: string,
    adicionais?:Adicional[]
}
