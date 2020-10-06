import { Usuario } from './usuario';
import { AnimalEstimacao } from './animalEstimacao';

export interface Cliente extends Usuario {
    animaisEstimacao?: AnimalEstimacao[] 
}
