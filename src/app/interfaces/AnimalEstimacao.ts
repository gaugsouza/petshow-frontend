import { TipoAnimal } from '../enum/TipoAnimal';

export interface AnimalEstimacao {
    id:number,
    nome:string,
    urlImage:string,
    tipoAnima:TipoAnimal
}