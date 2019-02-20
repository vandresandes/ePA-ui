import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { InformacoesNoSeiComponent } from './informacoes-no-sei.component';

describe('InformacoesNoSeiComponent', () => {
  let component: InformacoesNoSeiComponent;
  let fixture: ComponentFixture<InformacoesNoSeiComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ InformacoesNoSeiComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(InformacoesNoSeiComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
