import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { NucleoCadastroComponent } from './nucleo-cadastro.component';

describe('NucleoCadastroComponent', () => {
  let component: NucleoCadastroComponent;
  let fixture: ComponentFixture<NucleoCadastroComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ NucleoCadastroComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(NucleoCadastroComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
