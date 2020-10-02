import { Usuario } from '../interfaces/usuario';
import { TipoAnimal } from '../enum/TipoAnimal';
import { TipoPessoa } from '../enum/tipo-pessoa.enum';
import { Cliente } from '../interfaces/cliente';


export const monica: Cliente = {
    id:1, 
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
            tipo: {nome: 'GATO'},
        }
    ]
}
export const usuariosMock: Usuario[] = [monica]