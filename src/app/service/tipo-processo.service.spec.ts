import { TestBed } from '@angular/core/testing';

import { TipoProcessoService } from './tipo-processo.service';

describe('TipoProcessoService', () => {
  beforeEach(() => TestBed.configureTestingModule({}));

  it('should be created', () => {
    const service: TipoProcessoService = TestBed.get(TipoProcessoService);
    expect(service).toBeTruthy();
  });
});
