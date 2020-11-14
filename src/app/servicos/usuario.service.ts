import { Injectable } from '@angular/core';
import { environment } from 'src/environments/environment';
import { HttpHeaders, HttpClient } from '@angular/common/http';
import { Observable, of, throwError } from 'rxjs';
import { catchError, tap } from 'rxjs/operators';
import { Usuario } from 'src/app/interfaces/usuario';
import { NGXLogger } from 'ngx-logger';
import { Login } from 'src/app/interfaces/login';
import { AnimalEstimacao } from 'src/app/interfaces/animalEstimacao';
import { TipoAnimal } from 'src/app/enum/TipoAnimal';
import { JwtHelper } from 'src/app/util/jwt-helper';
import { Cliente } from 'src/app/interfaces/cliente';
import { HttpHandlerService } from 'src/app/servicos/http-handler.service';

@Injectable({
  providedIn: 'root'
})
export class UsuarioService {
  public USUARIO_SERVICE_URL = `${environment.API_URL}/cliente`;
  public ACESSO_URL = `${environment.API_URL}/acesso`;

  constructor(private httpHandler:HttpHandlerService,
              private jwtHelper:JwtHelper){}

  getUsuario(token:string) : Observable<Usuario> {
    let id = this.jwtHelper.recuperaIdToken(token);
    const URL = `${this.USUARIO_SERVICE_URL}/${id}`;    
    return this.httpHandler.doGet<Usuario>(URL, token);    
  }

  buscarUsuario(id:number) : Observable<any> {
    const URL = `${this.USUARIO_SERVICE_URL}/${id}`;    
    return this.httpHandler.doGet<any>(URL);    
  }

  atualizaUsuario(usuario:Usuario, token:string) : Observable<Usuario> {
    const URL = `${this.USUARIO_SERVICE_URL}/${usuario.id}`;
    return this.httpHandler.doPut<Usuario>(URL, usuario, token);
  } 

  adicionarAnimalEstimacao(animalEstimacao:AnimalEstimacao, token:string) : Observable<any> {
    const URL = `${this.USUARIO_SERVICE_URL}/animal-estimacao`;
    return this.httpHandler.doPost<any>(URL, animalEstimacao, token);
  }

  atualizarAnimalEstimacao(id:number, animalEstimacao:AnimalEstimacao, token:string) : Observable<any> {
    const URL = `${this.USUARIO_SERVICE_URL}/animal-estimacao/${id}`;
    return this.httpHandler.doPut<any>(URL, animalEstimacao, token);
  }

  removerAnimalEstimacao(id:number, token:string) : Observable<any> {
    let donoId = this.jwtHelper.recuperaIdToken(token);
    const URL = `${this.USUARIO_SERVICE_URL}/${donoId}/animal-estimacao/${id}`;
    return this.httpHandler.doDelete<any>(URL, token);
  }

  cadastrarUsuario(usuario:Usuario) : Observable<any> {
    const URL = `${this.ACESSO_URL}/cadastro`;
    return this.httpHandler.doPost<any>(URL, usuario);
  }

  buscarTiposAnimalEstimacao(token:string) : Observable<any> {
    const URL = `${this.USUARIO_SERVICE_URL}/animal-estimacao/tipos`;
    return this.httpHandler.doGet<any>(URL, token);
  }

  buscarAnimaisEstimacaoPorDono(donoId:number, pagina:number, quantidadeItens:number, token:string) : Observable<any> {
    const URL = `${this.USUARIO_SERVICE_URL}/${donoId}/animal-estimacao?pagina=${pagina}&quantidadeItens=${quantidadeItens}`;
    return this.httpHandler.doGet<any>(URL, token);
  }
}
