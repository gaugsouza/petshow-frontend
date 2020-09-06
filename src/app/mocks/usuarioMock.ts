import { Usuario } from '../interfaces/usuario';
import { TipoAnimal } from '../enum/TipoAnimal';


export const usuariosMock: Usuario[] = [
    {
        id: 1,
        nome: "Mônica",
        animaisEstimacao: [
            {
                id: 1,
                nome: "Monicão",
                donos: [
                    {
                        id: 1,
                        nome: "Mônica"
                    }
                ],
                tipoAnimal: TipoAnimal.CACHORRO,
                urlImage: ''

            }
        ]
    },
    {
        id: 2,
        nome: "Cebolinha",
        animaisEstimacao: [
            {
                id: 2,
                nome: "Floquinho",
                donos: [
                    {
                        id: 2,
                        nome: "Cebolinha"
                    }
                ],
                tipoAnimal: TipoAnimal.CACHORRO,
                urlImage: ''

            }
        ]
    },
    {
        id: 3,
        nome: "Magali",
        animaisEstimacao: [
            {
                id: 3,
                nome: "Mingau",
                donos: [
                    {
                        id: 3,
                        nome: "Magali"
                    }
                ],
                tipoAnimal: TipoAnimal.GATO,
                urlImage: ''

            }
        ]
    },
    {
        id: 4,
        nome: "Cascão",
        animaisEstimacao: [
            {
                id: 4,
                nome: "Chovinista",
                donos: [
                    {
                        id: 4,
                        nome: "Cascão"
                    }
                ],
                tipoAnimal: TipoAnimal.CACHORRO,
                urlImage: ''

            }
        ]
    },
    
]