import { TestBed } from '@angular/core/testing';

import { LoginAdnRegestService } from './login-adn-regest.service';

describe('LoginAdnRegestService', () => {
  let service: LoginAdnRegestService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(LoginAdnRegestService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
