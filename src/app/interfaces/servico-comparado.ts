import { Adicional } from 'src/app/interfaces/adicional';
import { ServicoDetalhadoTipoAnimal } from 'src/app/interfaces/servico-detalhado-tipo-animal';

export interface ServicoComparado {
    id?:number,
    maiorPreco?:number,
    menorPreco?:number,
    mediaAvaliacao?:number,
    tabelaPrecos?:ServicoDetalhadoTipoAnimal[],
    tiposAtendidos?:object,
    adicionais?:Adicional[],
    nome?:string
}
