import { Geolocalizacao } from 'src/app/interfaces/geolocalizacao';
import { TipoAnimal } from '../enum/TipoAnimal';

export interface FiltroServicos {
    tipoServicoId?: number,
    menorPreco?:number,
    maiorPreco?:number,
    mediaAvaliacao?:number,
    possuiAdicionais?:boolean,
    ordenacao?:string,
    posicaoAtual?:Geolocalizacao,
    metrosGeoloc?:number,
    cidade?:string,
    estado?:string,
    tiposAceitos?:TipoAnimal[]
}
