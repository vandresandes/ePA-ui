import { TestBed } from '@angular/core/testing';

import { TermoEspecificoService } from './termo-especifico.service';

describe('TermoEspecificoService', () => {
  beforeEach(() => TestBed.configureTestingModule({}));

  it('should be created', () => {
    const service: TermoEspecificoService = TestBed.get(TermoEspecificoService);
    expect(service).toBeTruthy();
  });
});
