import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { TermoEspecificoDetailComponent } from './termo-especifico-detail.component';

describe('TermoEspecificoDetailComponent', () => {
  let component: TermoEspecificoDetailComponent;
  let fixture: ComponentFixture<TermoEspecificoDetailComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ TermoEspecificoDetailComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(TermoEspecificoDetailComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
