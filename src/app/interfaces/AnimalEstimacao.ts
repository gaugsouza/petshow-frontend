import { TipoAnimal } from '../enum/TipoAnimal';
import { Usuario } from './usuario';

export interface AnimalEstimacao {
    id?:number,
    nome:string,
    foto?:string,
    tipo:TipoAnimal,
    dono?: Usuario
}