import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { InformacoesParaAPgeComponent } from './informacoes-para-a-pge.component';

describe('InformacoesParaAPgeComponent', () => {
  let component: InformacoesParaAPgeComponent;
  let fixture: ComponentFixture<InformacoesParaAPgeComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ InformacoesParaAPgeComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(InformacoesParaAPgeComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
