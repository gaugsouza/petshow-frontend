import { TipoAnimal } from 'src/app/enum/TipoAnimal';

export interface AnimalEstimacao {
    id?:number,
    nome:string,
    foto?:string,
    tipo:TipoAnimal,
    donoId?: number
}