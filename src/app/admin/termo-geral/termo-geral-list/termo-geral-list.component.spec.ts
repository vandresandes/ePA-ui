import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { TermoGeralListComponent } from './termo-geral-list.component';

describe('TermoGeralListComponent', () => {
  let component: TermoGeralListComponent;
  let fixture: ComponentFixture<TermoGeralListComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ TermoGeralListComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(TermoGeralListComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
