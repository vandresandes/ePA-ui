import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { NucleoDetailComponent } from './nucleo-detail.component';

describe('NucleoDetailComponent', () => {
  let component: NucleoDetailComponent;
  let fixture: ComponentFixture<NucleoDetailComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ NucleoDetailComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(NucleoDetailComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
