import { TestBed } from '@angular/core/testing';

import { DynamicContentInjectorService } from './dynamic-content-injector.service';

describe('DynamicContentInjectorService', () => {
  let service: DynamicContentInjectorService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(DynamicContentInjectorService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
