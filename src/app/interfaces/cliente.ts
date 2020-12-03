import { Usuario } from 'src/app/interfaces/usuario';
import { AnimalEstimacao } from 'src/app/interfaces/animalEstimacao';

export interface Cliente extends Usuario {
    animaisEstimacao?: AnimalEstimacao[] 
}
