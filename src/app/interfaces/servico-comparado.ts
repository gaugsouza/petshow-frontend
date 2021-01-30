import { Adicional } from "./adicional";
import { ServicoDetalhadoTipoAnimal } from "./servico-detalhado-tipo-animal";

export interface ServicoComparado {
    id?:number,
    maiorPreco?:number,
    menorPreco?:number,
    mediaAvaliacao?:number,
    tabelaPrecos?:ServicoDetalhadoTipoAnimal,
    tiposAtendidos?:object,
    adicionais?:Adicional[]

}
