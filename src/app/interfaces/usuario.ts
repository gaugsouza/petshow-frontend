import {AnimalEstimacao} from './AnimalEstimacao';
import { Endereco } from './endereco';
import { Login } from './login';
import { TipoPessoa } from '../enum/tipo-pessoa.enum';

export interface Usuario {
    id?: number, 
    nome?: string,
    foto?:string,
    cpf?:string,
    tipo?:TipoPessoa,
    login?:Login,
    endereco?: Endereco,
    telefone?: string
}
