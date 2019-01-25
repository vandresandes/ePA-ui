import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { PesquisaProcessoComponent } from './pesquisa-processo.component';

describe('PesquisaProcessoComponent', () => {
  let component: PesquisaProcessoComponent;
  let fixture: ComponentFixture<PesquisaProcessoComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ PesquisaProcessoComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(PesquisaProcessoComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
