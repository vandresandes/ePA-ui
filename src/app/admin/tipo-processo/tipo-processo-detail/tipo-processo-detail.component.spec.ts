import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { TipoProcessoDetailComponent } from './tipo-processo-detail.component';

describe('TipoProcessoDetailComponent', () => {
  let component: TipoProcessoDetailComponent;
  let fixture: ComponentFixture<TipoProcessoDetailComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ TipoProcessoDetailComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(TipoProcessoDetailComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
