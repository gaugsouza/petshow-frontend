import { ServicoDetalhado } from './servico-detalhado';
import { Usuario } from './usuario';

export interface Prestador extends Usuario {
    servicosDetalhados: ServicoDetalhado[]
}