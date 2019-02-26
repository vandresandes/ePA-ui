import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { EsclarecimentosComponent } from './esclarecimentos.component';

describe('EsclarecimentosComponent', () => {
  let component: EsclarecimentosComponent;
  let fixture: ComponentFixture<EsclarecimentosComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ EsclarecimentosComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(EsclarecimentosComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
