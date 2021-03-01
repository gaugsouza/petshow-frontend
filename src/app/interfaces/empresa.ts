import { Endereco } from "src/app/interfaces/endereco";

export interface Empresa {
    id?:number,
    endereco?:Endereco,
    nome?:string,
    razaoSocial?:string
    cnpj?:string,
}