import { Usuario } from '../interfaces/usuario';
import { TipoAnimal } from '../enum/TipoAnimal';
import { TipoPessoa } from '../enum/tipo-pessoa.enum';
import { Cliente } from '../interfaces/cliente';
import { Prestador } from '../interfaces/prestador';
import { servicos } from './servico-detalhado-mock';
import { BANHO } from '../util/tipo-servico';


export const monica: Cliente = {
    id:3, 
    nome: "Mônica",
    cpf:"44444444444",
    tipo:TipoPessoa.CLIENTE,
    login: {
        id: 1,
        email: "monica@gmail.com",
        senha: "teste1234"
    },
    endereco: {
        id:1,
        logradouro: "Rua aaaaa",
        numero: 30,
        estado: "SP",
        cep: "00000000",
        bairro: "Exemplo",
        cidade: "São Paulo",
    },
    telefone: "1129216554",
    animaisEstimacao: [
        {
            id: 1,
            nome: "Monicão",
            tipo: TipoAnimal.CACHORRO,
        }
    ]
}

export const cebolinha:Cliente =  {
    id:2, 
    nome: "Cebolinha",
    cpf:"66666666666",
    tipo:TipoPessoa.CLIENTE,
    login: {
        id: 1,
        email: "cebolinha@gmail.com",
        senha: "teste1234"
    },
    endereco: {
        id:1,
        logradouro: "Rua aaaaa",
        numero: 27,
        estado: "SP",
        cep: "00000000",
        bairro: "Exemplo",
        cidade: "São Paulo",
    },
    telefone: "1129383742",
    animaisEstimacao: [
        {
            id: 1,
            nome: "Floquinho",
            tipo: TipoAnimal.CACHORRO,
        }
    ]
}

export const tina:Prestador = {
    id:1,
    descricao:"Tina",
    cpf:'33333333333',
    endereco:{
        id:1,
        logradouro: "Rua aaaaa",
        numero: 50,
        estado: "SP",
        cep: "00000000",
        bairro: "Exemplo",
        cidade: "São Paulo",
    },
    foto:null,
    login: {
        email: "tina@tina.com",
        senha: "tina1234"
    },
    nome:"Tina",
    servicos:[
        {
            id: 1,
            preco: 30.0,
            tipo: BANHO
        }
    ],
    telefone:'1129382932',
    tipo:2
}
export const usuariosMock: Usuario[] = [monica, cebolinha, tina]
