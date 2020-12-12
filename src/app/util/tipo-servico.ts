import { Servico } from 'src/app/interfaces/servico';

export const BANHO:Servico = {
  id: 2,
  nome: 'BANHO',
};

export const PASSEIO:Servico = {
  id: 12,
  nome: 'PASSEIO',
};

export const PET_SITTING:Servico = {
  id: 22,
  nome: 'PET SITTING',
};

export const SERVICOS:Servico[] = [
  BANHO, PASSEIO, PET_SITTING,
];
