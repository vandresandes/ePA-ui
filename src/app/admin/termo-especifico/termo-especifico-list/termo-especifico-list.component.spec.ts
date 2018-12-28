import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { TermoEspecificoListComponent } from './termo-especifico-list.component';

describe('TermoEspecificoListComponent', () => {
  let component: TermoEspecificoListComponent;
  let fixture: ComponentFixture<TermoEspecificoListComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ TermoEspecificoListComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(TermoEspecificoListComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
