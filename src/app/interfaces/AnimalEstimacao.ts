import { TipoAnimal } from '../enum/TipoAnimal';

export interface AnimalEstimacao {
    id?:number,
    nome:string,
    foto?:string,
    tipo:TipoAnimal
}