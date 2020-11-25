import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { CONTA_SERVICE_URL } from 'src/app/util/url';
import { Usuario } from 'src/app/interfaces/usuario';
import { JwtHelper } from 'src/app/util/jwt-helper';
import { HttpHandlerService } from 'src/app/servicos/http-handler.service';

@Injectable({
  providedIn: 'root'
})
export class ContaService {

  constructor(private httpHelper:HttpHandlerService,
              private jwtHelper:JwtHelper) { }

  getConta(token:string): Observable<Usuario> {
    let id = this.jwtHelper.recuperaIdToken(token);
    const URL = `${CONTA_SERVICE_URL}/${id}`;    
    return this.httpHelper.doGet<Usuario>(URL, token);    
  }
}
