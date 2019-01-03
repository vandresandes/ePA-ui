import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { TipoProcessoCadastroComponent } from './tipo-processo-cadastro.component';

describe('TipoProcessoCadastroComponent', () => {
  let component: TipoProcessoCadastroComponent;
  let fixture: ComponentFixture<TipoProcessoCadastroComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ TipoProcessoCadastroComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(TipoProcessoCadastroComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
