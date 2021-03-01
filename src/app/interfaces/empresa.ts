import { Endereco } from 'src/app/interfaces/endereco';
import { Geolocalizacao } from 'src/app/interfaces/geolocalizacao';

export interface Empresa {
    id?:number,
    endereco?:Endereco,
    nome?:string,
    razaoSocial?:string
    cnpj?:string,
    geolocalizacao?:Geolocalizacao
}
