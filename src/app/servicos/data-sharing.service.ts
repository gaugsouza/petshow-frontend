import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs';
import { AnimalEstimacao } from '../interfaces/animalEstimacao';

@Injectable({
  providedIn: 'root',
})
export class DataSharingService {
  public isUsuarioLogado:BehaviorSubject<boolean> = new BehaviorSubject<boolean>(false);

  public animaisSelecionadosList:BehaviorSubject<AnimalEstimacao[]> =
  new BehaviorSubject<AnimalEstimacao[]>([]);

  constructor() { }
}
