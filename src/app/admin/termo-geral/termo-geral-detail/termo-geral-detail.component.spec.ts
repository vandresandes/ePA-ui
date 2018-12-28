import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { TermoGeralDetailComponent } from './termo-geral-detail.component';

describe('TermoGeralDetailComponent', () => {
  let component: TermoGeralDetailComponent;
  let fixture: ComponentFixture<TermoGeralDetailComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ TermoGeralDetailComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(TermoGeralDetailComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
