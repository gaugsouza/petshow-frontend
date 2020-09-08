import { TipoAnimal } from '../enum/TipoAnimal';
import { Usuario } from './usuario';

export interface AnimalEstimacao {
    id?:number,
    nome:string,
    foto?:string,
    tipoAnimal:TipoAnimal,
    donos?: Usuario[]
}