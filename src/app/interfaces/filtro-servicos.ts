import { Geolocalizacao } from "src/app/interfaces/geolocalizacao";

export interface FiltroServicos {
    tipoServicoId?: number,
    menorPreco?:number,
    maiorPreco?:number,
    mediaAvaliacao?:number,
    possuiAdicionais?:boolean,
    ordenacao?:string,
    posicaoAtual?:Geolocalizacao,
    metrosGeoloc?:number

}
