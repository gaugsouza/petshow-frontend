import {AnimalEstimacao} from './AnimalEstimacao';

export interface Usuario {
    id?: number, 
    nome: string,
    animaisEstimacao?: AnimalEstimacao[]
}
