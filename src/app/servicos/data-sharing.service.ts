import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class DataSharingService {
  public isUsuarioLogado:BehaviorSubject<boolean> = new BehaviorSubject<boolean>(false);
  constructor() { }
}
