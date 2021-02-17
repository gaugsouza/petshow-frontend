import { Servico } from 'src/app/interfaces/servico';
import { Avaliacao } from 'src/app/interfaces/avaliacao';
import { Prestador } from 'src/app/interfaces/prestador';
import { TipoAnimal } from 'src/app/enum/TipoAnimal';
import { ServicoDetalhadoTipoAnimal } from 'src/app/interfaces/servico-detalhado-tipo-animal';
import { Adicional } from 'src/app/interfaces/adicional';

export interface ServicoDetalhado {
    id?:number,
    tipo?:Servico,
    prestador?:Prestador,
    avaliacoes?:Avaliacao[]
    descricao?: string,
    animaisAceitos?: TipoAnimal[],
    precoPorTipo?: ServicoDetalhadoTipoAnimal[]
    adicionais?:Adicional[],
    mediaAvaliacao?:number,
}
