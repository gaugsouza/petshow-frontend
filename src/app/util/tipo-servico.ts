import { Servico } from '../interfaces/servico';

export const BANHO:Servico = {
    id: 1,
    nome: 'BANHO'
}

export const PASSEIO:Servico = {
    id: 2,
    nome: 'PASSEIO'
}

export const PET_SITTING:Servico = {
    id: 3,
    nome: 'PET SITTING'
} 

export const SERVICOS:Servico[] = [
    BANHO, PASSEIO, PET_SITTING
]