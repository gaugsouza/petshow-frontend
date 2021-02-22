import { Usuario } from 'src/app/interfaces/usuario';

export interface Login {
    id?: number,
    email: string,
    senha: string,
    usuario?: Usuario
}
