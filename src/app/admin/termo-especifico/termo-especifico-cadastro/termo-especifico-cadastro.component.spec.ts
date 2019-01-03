import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { TermoEspecificoCadastroComponent } from './termo-especifico-cadastro.component';

describe('TermoEspecificoCadastroComponent', () => {
  let component: TermoEspecificoCadastroComponent;
  let fixture: ComponentFixture<TermoEspecificoCadastroComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ TermoEspecificoCadastroComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(TermoEspecificoCadastroComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
