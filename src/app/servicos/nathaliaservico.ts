import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class ServicosService {
  public SERVICOS_SERVICE_URL = `${environment.API_URL}servicos`;

  httpOptions = {
    headers: new HttpHeaders({ 'Content-type' : 'application/json'})
  }


  constructor() {
              private http:HttpClient, //possibilita fazer requisições
              private logger: NGXLogger,//faz logs
              private storageService:LocalStorageService //tá criando o LocalStorage, 
                                                          //coloca o objeto dentro do local e 
                                                          //aí ele pode ser acessado daí
  }
  

  Preciso retornar todos os meus prestadores dado um serviço
  buscarPrestadoresPorServico = () => {
    return this.storageService.getItem('prestadores'); //busca o Usuario no localStorage
  }



  getServicos = (): Observable<Servicos> => { //Observable - objeto assincrono, faz a requisição e fica esperando
                                                    //resposta. Em cima dessa resposta ele faz a operação. 
    const url = `${this.SERVICOS_SERVICE_URL}`; //la no back-end
    return this.http.get<Servicos>(url)
    .pipe(
      tap(_ => this.logger.info(`Request feito a ${url}`)),
      catchError(this.handleError<Servicos>(`Falha em requisição feita a ${url}`))
    );
  }


  Não tenho atualização/adição/remoção de serviços via plataforma
  atualizaUsuario = (usuario:Usuario) : Observable<Usuario> => {
    console.log(usuario);
    return this.http.put<Usuario>(this.USUARIO_SERVICE_URL, usuario, this.httpOptions) //faz req do tipo put, pra url de cliente que tinha método anotado com put,
                                                                                      //mandando corpo com usuario e mandando as opções de header
    .pipe(
      tap(_ => this.logger.info(`Request feito a ${this.USUARIO_SERVICE_URL}`)), //se deu certo, faz log falando qu fez a req praquela url
      catchError(err => {
        this.handleError<Usuario>('update');//da um log de erro
        return throwError(err); //lança um observável com erro, e esse observavel vai ser usado no componente pra retornar a msg de erro
      })
    );
  } 

}