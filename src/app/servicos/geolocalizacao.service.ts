import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { HttpHandlerService } from 'src/app/servicos/http-handler.service';

@Injectable({
  providedIn: 'root',
})
export class GeolocalizacaoService {
  private API_GEOLOC_URL = 'https://nominatim.openstreetmap.org/search?q=';

  constructor(private http:HttpHandlerService) { }

  buscaGeoloc = (rua:string = '', numero:string = '') :Observable<any> => {
    const URL = `${this.API_GEOLOC_URL}${rua} ${numero} ,Brazil&format=json`;
    return this.http.doGet(URL);
  }

  buscaGeolocCidade = (cidade:string, estado:string) => {
    const URL = `${this.API_GEOLOC_URL}${cidade}, ${estado}, Brazil&format=json`;
    return this.http.doGet(URL);
  }
}
