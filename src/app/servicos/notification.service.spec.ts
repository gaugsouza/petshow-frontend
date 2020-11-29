import { TestBed } from '@angular/core/testing';

import { NotificationService } from './notification.service';
import { ServicoDetalhado } from '../interfaces/servico-detalhado';
import { ReplaySubject } from 'rxjs';

describe('NotificationService', () => {
  let service: NotificationService<ServicoDetalhado>;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(NotificationService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });

  it('Deve modificar o subject', () => {
    let obj:ServicoDetalhado = {};
    service.notify(obj);
    service.obs.subscribe(el => expect(el).toEqual(obj));
  });
});
