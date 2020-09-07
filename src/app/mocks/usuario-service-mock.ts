import {usuariosMock} from './usuarioMock';
import { Usuario } from '../interfaces/usuario';
import { Observable, of } from 'rxjs';

export class UsuarioServiceMock {
    getUsuario(id:number) : Observable<Usuario> {
        return of(usuariosMock.find(usuario => usuario.id === id));
    }
}
