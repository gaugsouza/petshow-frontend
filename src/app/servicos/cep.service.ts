import { Injectable } from '@angular/core';
import { HttpHandlerService } from './http-handler.service';

@Injectable({
  providedIn: 'root',
})
export class CepService {
  private API_URL = 'https://viacep.com.br/ws/{cep}/json';

  constructor(private http:HttpHandlerService) { }

  buscaCep = (cep:string) => {
    const URL = this.API_URL.replace('{cep}', cep);
    return this.http.doGet<any>(URL);
  }
}
