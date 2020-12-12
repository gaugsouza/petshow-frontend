import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { Usuario } from 'src/app/interfaces/usuario';
import { AnimalEstimacao } from 'src/app/interfaces/animalEstimacao';
import { JwtHelper } from 'src/app/util/jwt-helper';
import { HttpHandlerService } from 'src/app/servicos/http-handler.service';
import { CLIENTE_SERVICE_URL, ANIMAL_SERVICE_URL } from 'src/app/util/url';

@Injectable({
  providedIn: 'root',
})
export class UsuarioService {
  constructor(private httpHandler:HttpHandlerService,
              private jwtHelper:JwtHelper) {}

  getUsuario(token:string) : Observable<Usuario> {
    const id = this.jwtHelper.recuperaIdToken(token);
    const URL = `${CLIENTE_SERVICE_URL}/${id}`;
    return this.httpHandler.doGet<Usuario>(URL, token);
  }

  buscarUsuario(id:number) : Observable<any> {
    const URL = `${CLIENTE_SERVICE_URL}/${id}`;
    return this.httpHandler.doGet<any>(URL);
  }

  atualizaUsuario(usuario:Usuario, token:string) : Observable<Usuario> {
    const URL = `${CLIENTE_SERVICE_URL}/${usuario.id}`;
    return this.httpHandler.doPut<Usuario>(URL, usuario, token);
  }

  adicionarAnimalEstimacao(animalEstimacao:AnimalEstimacao, token:string) : Observable<any> {
    const URL = `${CLIENTE_SERVICE_URL}/animal-estimacao`;
    return this.httpHandler.doPost<any>(URL, animalEstimacao, token);
  }

  atualizarAnimalEstimacao(id:number, animalEstimacao:AnimalEstimacao, token:string) :
  Observable<any> {
    const URL = `${CLIENTE_SERVICE_URL}/animal-estimacao/${id}`;
    return this.httpHandler.doPut<any>(URL, animalEstimacao, token);
  }

  removerAnimalEstimacao(id:number, token:string) : Observable<any> {
    const donoId = this.jwtHelper.recuperaIdToken(token);
    const BASE_ANIMAL_URL = ANIMAL_SERVICE_URL.replace('idCliente', donoId.toString());
    const URL = `${BASE_ANIMAL_URL}/${id}`;
    return this.httpHandler.doDelete<any>(URL, token);
  }

  buscarTiposAnimalEstimacao(token:string) : Observable<any> {
    const URL = `${CLIENTE_SERVICE_URL}/animal-estimacao/tipos`;
    return this.httpHandler.doGet<any>(URL, token);
  }

  buscarAnimaisEstimacaoPorDono(donoId:number, pagina:number, quantidadeItens:number, token:string):
  Observable<any> {
    const URL = `${CLIENTE_SERVICE_URL}/${donoId}/animal-estimacao?pagina=${pagina}&quantidadeItens=${quantidadeItens}`;
    return this.httpHandler.doGet<any>(URL, token);
  }
}
