import { Endereco } from './endereco';
import { AnimalEstimacao } from './animalEstimacao';
import { ServicoDetalhado } from './servico-detalhado';
import { StatusAgendamento } from './statusAgendamento';
import { Cliente } from './cliente';
import { Prestador } from './prestador';
import { Usuario } from './usuario';
import { Avaliacao } from './avaliacao';
import { Adicional } from './adicional';

export interface Agendamento {
    id?:number;
    data?:Date;
    comentario?:string;
    endereco?:Endereco;
    precoFinal?:number;
    statusId?:number;
    status?:StatusAgendamento;
    clienteId?:number;
    cliente?:Usuario;
    prestadorId?:number;
    prestador?:Prestador;
    servicoDetalhadoId?:number;
    servicoDetalhado?:ServicoDetalhado;
    avaliacao?:Avaliacao;
    animaisAtendidosIds?:number[];
    animaisAtendidos?:AnimalEstimacao[];
    adicionaisIds?:number[];
    adicionais?:Adicional[];
}
