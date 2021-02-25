import { environment } from 'src/environments/environment';

const BASE_URL = environment.API_URL;
export const TIPO_SERVICO_URL = `${BASE_URL}/servico`;
export const SERVICO_DETALHADO_URL = `${BASE_URL}/servico-detalhado`;
export const CLIENTE_SERVICE_URL = `${BASE_URL}/cliente`;
export const ACESSO_SERVICE_URL = `${BASE_URL}/acesso`;
export const ANIMAL_SERVICE_URL = `${CLIENTE_SERVICE_URL}/idCliente/animal-estimacao`;
export const PRESTADOR_SERVICE_URL = `${BASE_URL}/prestador`;
export const PRESTADOR_SERVICO_DETALHADO = `${PRESTADOR_SERVICE_URL}/idPrestador/servico-detalhado`;
export const AVALIACAO_SERVICE_URL = `${PRESTADOR_SERVICO_DETALHADO}/idServico/agendamento/idAgendamento/avaliacoes`;
export const SERVICO_AVALIADO_URL = `${SERVICO_DETALHADO_URL}/idServico/avaliacoes`;
export const CONTA_SERVICE_URL = `${BASE_URL}/conta`;
export const AGENDAMENTO_URL = `${BASE_URL}/agendamento`;
export const EMPRESA_URL = `${BASE_URL}/empresa`
