import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { Empresa } from '../interfaces/empresa';
import { EMPRESA_URL } from '../util/url';
import { HttpHandlerService } from './http-handler.service';

@Injectable({
  providedIn: 'root'
})
export class EmpresaService {

  constructor(private http:HttpHandlerService) { }

  atualizaEmpresa = (empresa:Empresa, token:string):Observable<any> =>  {

    return this.http.doPut(`${EMPRESA_URL}/${empresa.id}`, empresa, token);
  }
}
