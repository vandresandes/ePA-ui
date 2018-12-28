import { TestBed } from '@angular/core/testing';

import { DocumentoService } from './documento.service';

describe('DocumentoService', () => {
  beforeEach(() => TestBed.configureTestingModule({}));

  it('should be created', () => {
    const service: DocumentoService = TestBed.get(DocumentoService);
    expect(service).toBeTruthy();
  });
});
