import { TestBed } from '@angular/core/testing';

import { TermoGeralService } from './termo-geral.service';

describe('TermoGeralService', () => {
  beforeEach(() => TestBed.configureTestingModule({}));

  it('should be created', () => {
    const service: TermoGeralService = TestBed.get(TermoGeralService);
    expect(service).toBeTruthy();
  });
});
