import { Servico } from 'src/app/interfaces/servico';

export const BANHO:Servico = {
  id: 2,
  nome: 'BANHO',
  grupo: 'BANHO_TOSA'
};

export const PASSEIO:Servico = {
  id: 12,
  nome: 'PASSEIO',
  grupo: 'HOSPEDAGEM'
};

export const PET_SITTING:Servico = {
  id: 22,
  nome: 'PET SITTING',
  grupo: 'HOSPEDAGEM'
};

export const SERVICOS:Servico[] = [
  BANHO, PASSEIO, PET_SITTING,
];
