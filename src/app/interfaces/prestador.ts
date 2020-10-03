import { ServicoDetalhado } from './servico-detalhado';

export interface Prestador {
    id?: Number,
    nome: String,
    servicosDetalhados: ServicoDetalhado
}
