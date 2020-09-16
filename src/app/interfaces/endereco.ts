export interface Endereco {
    id?: number,
    logradouro: string,
    cep: string,
    bairro: string,
    cidade: string,
    estado: string,
    numero: number,
    complemento?: string
}