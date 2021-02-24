import { Usuario } from 'src/app/interfaces/usuario';
import { ServicoDetalhado } from 'src/app/interfaces/servico-detalhado';
import { Empresa } from 'src/app/interfaces/empresa';

export interface Prestador extends Usuario {
    descricao:string,
    servicos?:ServicoDetalhado[],
    empresa?:Empresa,
}
