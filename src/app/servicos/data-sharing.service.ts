import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs';
import { AnimalEstimacao } from '../interfaces/animalEstimacao';
import { FiltroServicos } from '../interfaces/filtro-servicos';

@Injectable({
  providedIn: 'root',
})
export class DataSharingService {
  public isUsuarioLogado:BehaviorSubject<boolean> = new BehaviorSubject<boolean>(false);

  public animaisSelecionadosList:BehaviorSubject<AnimalEstimacao[]> =
  new BehaviorSubject<AnimalEstimacao[]>([]);

  public filtroShared:BehaviorSubject<FiltroServicos> = new BehaviorSubject<FiltroServicos>({});

  constructor() { }
}
