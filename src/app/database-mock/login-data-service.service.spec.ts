import { TestBed } from '@angular/core/testing';

import { LoginDataServiceService } from './login-data-service.service';

describe('LoginDataServiceService', () => {
  let service: LoginDataServiceService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(LoginDataServiceService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
