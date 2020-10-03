import { Endereco } from '../interfaces/endereco';
import { Login } from '../interfaces/login';
import { TipoPessoa } from '../enum/tipo-pessoa.enum';

export class Prestador{
    id?: number;
    nome: string;
    nomeSocial: string; // VERIFICAR EXISTENCIA NO CODIGO
    foto?:string;
    cpf:string;
    tipo:TipoPessoa;
    login:Login;
    endereco?: Endereco;
    telefone: string;
    descricao: string;
    //  servicosDetalhados?: ServicoDetalhado[]
}