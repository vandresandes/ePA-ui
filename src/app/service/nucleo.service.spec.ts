import { TestBed } from '@angular/core/testing';

import { NucleoService } from './nucleo.service';

describe('NucleoService', () => {
  beforeEach(() => TestBed.configureTestingModule({}));

  it('should be created', () => {
    const service: NucleoService = TestBed.get(NucleoService);
    expect(service).toBeTruthy();
  });
});
