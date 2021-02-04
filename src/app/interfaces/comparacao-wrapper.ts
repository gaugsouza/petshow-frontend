import { Comparacoes } from 'src/app/interfaces/comparacoes';
import { ServicoComparado } from 'src/app/interfaces/servico-comparado';

export interface ComparacaoWrapper {
    servicosComparados:ServicoComparado[],
    comparacoes:Comparacoes
}
