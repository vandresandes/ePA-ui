import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ImpressaoResultadoComponent } from './impressao-resultado.component';

describe('ImpressaoResultadoComponent', () => {
  let component: ImpressaoResultadoComponent;
  let fixture: ComponentFixture<ImpressaoResultadoComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ImpressaoResultadoComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ImpressaoResultadoComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
