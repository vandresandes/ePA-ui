import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ChecklistInformacoesRequeridasComponent } from './checklist-informacoes-requeridas.component';

describe('ChecklistInformacoesRequeridasComponent', () => {
  let component: ChecklistInformacoesRequeridasComponent;
  let fixture: ComponentFixture<ChecklistInformacoesRequeridasComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ChecklistInformacoesRequeridasComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ChecklistInformacoesRequeridasComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
