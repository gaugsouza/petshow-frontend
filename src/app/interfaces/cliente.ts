import { Usuario } from './usuario';
import { AnimalEstimacao } from './AnimalEstimacao';

export interface Cliente extends Usuario {
    animaisEstimacao?: AnimalEstimacao[] 
}
