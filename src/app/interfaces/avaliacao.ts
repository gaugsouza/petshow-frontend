import { Cliente } from './cliente';
import { ServicoDetalhado } from './servico-detalhado';

export interface Avaliacao {
    id?:number,
    atencao:number,
    qualidadeProdutos:number,
    custoBeneficio:number,
    infraestrutura:number,
    qualidadeServico:number,
    comentario?:string,
    media?:number,
    cliente?:Cliente,
    servicoAvaliado?:ServicoDetalhado
    servicoAvaliadoId?:number

}
