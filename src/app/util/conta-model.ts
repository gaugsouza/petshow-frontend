import { TipoPessoa } from 'src/app/enum/tipo-pessoa.enum';
import { Cliente } from 'src/app/interfaces/cliente';
import { Prestador } from 'src/app/interfaces/prestador';

export const prestador:Prestador = {
    nome: "",
    foto: "",
    cpf: "",
    tipo: TipoPessoa.PRESTADOR_AUTONOMO,
    endereco: {
      logradouro: "",
      cep: "",
      bairro: "",
      cidade: "",
      estado: "",
      numero: null,
      complemento: ""
    },
    login: {
      email: "",
      senha: ""
    },
    telefone: "",
    descricao: "",
    servicos:[]
  };

export const cliente:Cliente =  {
    nome: "",
    foto: "",
    cpf: "",
    tipo:TipoPessoa.CLIENTE,
    endereco: {
      logradouro: "",
      cep: "",
      bairro: "",
      cidade: "",
      estado: "",
      numero: null,
      complemento: ""
    },
    login: {
      email: null,
      senha: null
    },
    animaisEstimacao: [],
    telefone: ""
  };