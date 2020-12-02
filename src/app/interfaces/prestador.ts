import { Usuario } from 'src/app/interfaces/usuario';
import { ServicoDetalhado } from 'src/app/interfaces/servico-detalhado';

export interface Prestador extends Usuario {
    descricao:string,
    servicos?:ServicoDetalhado[]
}
