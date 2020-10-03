import { ServicoDetalhado } from "../interfaces/servico-detalhado";
import { TipoPessoa } from '../enum/tipo-pessoa.enum';
import { monica, cebolinha } from './usuarioMock';

let servicoDetalhado:ServicoDetalhado = {
    id: 1,
    preco: 30.0,
    tipo: {
        id: 1,
        nome: "Banho e tosa",
        descricao: "Banho e tosa"
    },
    prestador: {
        id: 2,
        tipo: TipoPessoa.PRESTADOR_AUTONOMO,
        cpf: "55555555555",
        descricao: "Serviços gerais para pet",
        nome: "Petshow",
        telefone: "1129289282",
        login: {
            email: "petshow@teste.com",
            senha: "petshow1234"
        }
    },
    avaliacoes: [
        {
            id: 1,
            media: 5,
            atencao: 5,
            custoBeneficio: 5,
            infraestrutura: 5,
            qualidadeProdutos: 5,
            qualidadeServico: 5,
            cliente: {
                ...monica
            },
            servicoAvaliado: {
                id: 1
            },
            comentario: "Bom demais"
        },
        {
            id: 2,
            media: 3.5,
            atencao: 3,
            custoBeneficio: 4,
            infraestrutura: 2,
            qualidadeProdutos: 5,
            qualidadeServico: 3,
            cliente: {
                ...cebolinha
            },
            servicoAvaliado: {
                id: 1
            },
            comentario: "Meh"
        }
    ]
}

export const servicos: ServicoDetalhado[] = [servicoDetalhado];