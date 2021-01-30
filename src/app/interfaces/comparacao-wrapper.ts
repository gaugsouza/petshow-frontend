import { Comparacoes } from "./comparacoes";
import { ServicoComparado } from "./servico-comparado";

export interface ComparacaoWrapper {
    servicosComparados:ServicoComparado[],
    comparacoes:Comparacoes
}
