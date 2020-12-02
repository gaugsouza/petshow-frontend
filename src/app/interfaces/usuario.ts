import { Endereco } from 'src/app/interfaces/endereco';
import { Login } from 'src/app/interfaces/login';
import { TipoPessoa } from 'src/app/enum/tipo-pessoa.enum';

export interface Usuario {
    id?: number, 
    nome?: string,
    foto?:string,
    cpf?:string,
    tipo?:TipoPessoa,
    login?:Login,
    endereco?: Endereco,    
    telefone?: string,
    isAtivo?:boolean,
    mensagem?:string
}
