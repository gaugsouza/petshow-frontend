import { Endereco } from '../interfaces/endereco';
import { Login } from '../interfaces/login';
import { TipoPessoa } from '../enum/tipo-pessoa.enum';

export class Prestador{
    id?: number;
    nome: string;
    nomeSocial: string; // VERIFICAR EXISTENCIA NO CODIGO
    foto?:string;
    cpf:string;
    nascimento:Date; // VERIFICAR EXISTENCIA NO CODIGO
    tipo:TipoPessoa;
    login:Login;
    email: string;
    senha: string;
    confirmarSenha: string;
    endereco?: Endereco;
    telefone: string;
    descricao: string;
    //  servicosDetalhados?: ServicoDetalhado[]

    constructor({ id, nome, nomeSocial, foto, cpf, nascimento, tipo, login, email, senha, confirmarSenha, endereco, telefone, descricao }: { id?: number; nome: string; nomeSocial: string; foto?: string; cpf: string; nascimento: Date; tipo: TipoPessoa; login: Login; email: string; senha: string; confirmarSenha: string; endereco?: Endereco; telefone: string; descricao: string; }) {
        this.id = id;
        this.nome = nome;
        this.nomeSocial = nomeSocial; // VERIFICAR EXISTENCIA NO CODIGO
        this.foto = foto;
        this.cpf = cpf;
        this.nascimento = nascimento; // VERIFICAR EXISTENCIA NO CODIGO
        this.tipo = tipo;
        this.login = login;
        this.email = email;
        this.senha = senha;
        this.confirmarSenha = confirmarSenha;
        this.endereco = endereco;
        this.telefone = telefone;
        this.descricao = descricao;
    }



}