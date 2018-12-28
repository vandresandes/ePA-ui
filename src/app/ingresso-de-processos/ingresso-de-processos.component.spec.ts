import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { IngressoDeProcessosComponent } from './ingresso-de-processos.component';

describe('IngressoDeProcessosComponent', () => {
  let component: IngressoDeProcessosComponent;
  let fixture: ComponentFixture<IngressoDeProcessosComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ IngressoDeProcessosComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(IngressoDeProcessosComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
