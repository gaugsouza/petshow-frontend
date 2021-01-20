import { Endereco } from './endereco';
import { AnimalEstimacao } from './animalEstimacao';
import { ServicoDetalhado } from './servico-detalhado';
import { StatusAgendamento } from './statusAgendamento';
import { Cliente } from './cliente';
import { Prestador } from './prestador';

export interface Agendamento {
    id?: number,
    precoFinal: number,
    mediaAvaliacao?: number,
    data?: string,
    comentario?: string,
    endereco?: Endereco,
    animaisAtendidos: AnimalEstimacao[],
    servicoDetalhado?: ServicoDetalhado,
    servicoDetalhadoId: number;
    status?: StatusAgendamento,
    clienteId: number,
    cliente?: Cliente,
    prestadorId: number,
    prestador?: Prestador
}
