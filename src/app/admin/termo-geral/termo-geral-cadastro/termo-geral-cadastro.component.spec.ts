import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { TermoGeralCadastroComponent } from './termo-geral-cadastro.component';

describe('TermoGeralCadastroComponent', () => {
  let component: TermoGeralCadastroComponent;
  let fixture: ComponentFixture<TermoGeralCadastroComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ TermoGeralCadastroComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(TermoGeralCadastroComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
