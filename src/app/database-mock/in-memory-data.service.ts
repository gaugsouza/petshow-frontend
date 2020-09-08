import { Injectable } from '@angular/core';
import { InMemoryDbService, RequestInfo } from 'angular-in-memory-web-api';
import { usuariosMock } from '../mocks/usuarioMock';
import { loginsMock } from '../mocks/login-mock';
@Injectable({
  providedIn: 'root'
})
export class InMemoryDataService implements InMemoryDbService {

  createDb() {
    // const contas = usuariosMock;
    return {
      contas: usuariosMock,
      logins: loginsMock
    }

  }
  post(reqInfo: RequestInfo) {
    if(reqInfo.collectionName === 'logins') {
      return this.authenticate(reqInfo);
    }
  }

  authenticate(reqInfo: RequestInfo) {
    return reqInfo.utils.createResponse$(() => {
      const {headers, url, req} = reqInfo;
      const {email, senha} = req['body'];

      const usuario = loginsMock.find(login => login.email === email && login.senha === senha).usuario;
      if(!usuario) {
        return { 
          status: 401, 
          headers, 
          url, 
          body: { } 
        }
      }

      return {
        status: 200, 
                  headers, // reqInfo (line 30)
                  url, // reqInfo (line 30)
                  body: { 
                    token: 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJzdWIiOiIxMjM0NTY3ODkwIiwibmFtZSI6IkpvaG4gRG9lIiwiaWF0IjoxNTE2MjM5MDIyfQ.SflKxwRJSMeKKF2QT4fwpMeJf36POk6yJV_adQssw5c',
                    usuario
                  } 
      }
    });
  }


  genId(elementos: any[]) : number {
    return elementos.length > 0 ? Math.max(...elementos.map(el => el.id)) + 1 : 1;
  }
  constructor() { }
}
