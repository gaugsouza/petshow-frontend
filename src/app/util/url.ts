import { environment } from 'src/environments/environment';
const BASE_URL = environment.API_URL;

export const SERVICOS_URL = `${BASE_URL}/servico`;
export const SERVICOS_SERVICE_URL = `${BASE_URL}/servico-detalhado`;
export const CLIENTE_SERVICE_URL = `${BASE_URL}/cliente`;
export const ACESSO_BASE_URL = `${BASE_URL}/acesso`;
export const ANIMAL_SERVICE_URL  = `${CLIENTE_SERVICE_URL}/idCliente/animal-estimacao`;
export const PRESTADOR_SERVICE_URL = `${BASE_URL}/prestador`
export const SERVICO_DETALHADO_URL = `${PRESTADOR_SERVICE_URL}/idPrestador/servico-detalhado`;
export const AVALIACAO_SERVICE_URL = `${SERVICO_DETALHADO_URL}/idServico/avaliacao`;
export const SERVICO_AVALIADO_URL  = `${SERVICOS_SERVICE_URL}/idServico/avaliacoes`;