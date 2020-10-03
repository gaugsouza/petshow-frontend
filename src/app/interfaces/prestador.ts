import { Usuario } from './usuario';


export interface Prestador extends Usuario {
    descricao: string,
//  servicosDetalhados?: ServicoDetalhado[]
}