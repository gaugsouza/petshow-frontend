import { Endereco } from "src/app/interfaces/endereco";
import { Prestador } from "src/app/interfaces/prestador";

export interface Empresa {
    id?:number,
    dono?:Prestador,
    endereco?:Endereco,
    nome?:string,
    nomeSocial?:string
    cnpj?:string,
}