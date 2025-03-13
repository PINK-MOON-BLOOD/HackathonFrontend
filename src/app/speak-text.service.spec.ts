import { TestBed } from '@angular/core/testing';

import { SpeakTextService } from './speak-text.service';

describe('SpeakTextService', () => {
  let service: SpeakTextService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(SpeakTextService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
