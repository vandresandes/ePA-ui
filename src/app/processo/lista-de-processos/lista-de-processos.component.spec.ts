import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ListaDeProcessosComponent } from './lista-de-processos.component';

describe('ListaDeProcessosComponent', () => {
  let component: ListaDeProcessosComponent;
  let fixture: ComponentFixture<ListaDeProcessosComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ListaDeProcessosComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ListaDeProcessosComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
