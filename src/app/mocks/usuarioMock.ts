import { Usuario } from '../interfaces/usuario';
import { Faker } from 'faker';
import { AnimalEstimacao } from '../interfaces/AnimalEstimacao';
import { TipoAnimal } from '../enum/TipoAnimal';

const gerarAnimal = (id:number, usuario: Usuario) : AnimalEstimacao => {
    let animal: AnimalEstimacao = {
        id: id,
        nome: Faker.firstName,
        tipoAnimal: TipoAnimal.CACHORRO,
        donos: [usuario],
        urlImage: ''
    }
    return animal;
}

const gerarMock = (id: number) : Usuario => {
    let usuario: Usuario = {
        id: id,
        nome: Faker.firstName,
    }
    for(let i = 0; i < 3 ; i++) {
        let animal = gerarAnimal(i+1, usuario);
        usuario.animaisEstimacao.push(animal);
    }
    return usuario;
}

const gerarMocks = (): Usuario[] => {
    let usuarios: Usuario[] = [];
    for (let i = 0; i < 10; i++ ){
        let usuario = gerarMock(i+1);
        usuarios.push(usuario);
    }

    return usuarios;
}


export const usuariosMock: Usuario[] = gerarMocks();