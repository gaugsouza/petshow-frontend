
import { TipoAnimal } from 'src/app/enum/TipoAnimal';

export interface ServicoDetalhadoTipoAnimal {
    id?:number,
    preco:number,
    tipoAnimal: TipoAnimal,
}