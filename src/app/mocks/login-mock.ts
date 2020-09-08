import { Login } from '../interfaces/login';
import { monica } from './usuarioMock';

export const login: Login = {
    id: 1,
    email: monica.login.email,
    senha: monica.login.senha,
    usuario: monica
}

export const loginsMock: Login[] = [
    login
]