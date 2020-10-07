import { Usuario } from './usuario';
import { ServicoDetalhado } from './servico-detalhado';

export interface Prestador extends Usuario {
    descricao:string,
    servicosDetalhados?:ServicoDetalhado[]
}
