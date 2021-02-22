import { Prestador } from "../interfaces/prestador";
import { TipoPessoa } from '../enum/tipo-pessoa.enum';
import { servicos } from './servico-detalhado-mock';

let prestador:Prestador = {
    id: 2,
    tipo: TipoPessoa.PRESTADOR_AUTONOMO,
    cpf: "55555555555",
    descricao: "Serviços gerais para pet",
    nome: "Petshow",
    telefone: "1129289282",
    login: {
        email: "petshow@teste.com",
        senha: "petshow1234"
    },
    servicos: [
        ...servicos
    ]
}

export const prestadores:Prestador[] = [prestador];