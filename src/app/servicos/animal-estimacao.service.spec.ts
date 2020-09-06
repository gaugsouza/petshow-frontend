import { TestBed } from '@angular/core/testing';

import { AnimalEstimacaoService } from './animal-estimacao.service';

describe('AnimalEstimacaoService', () => {
  let service: AnimalEstimacaoService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(AnimalEstimacaoService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
