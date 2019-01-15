import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { InteressadoDialogComponent } from './interessado-dialog.component';

describe('InteressadoDialogComponent', () => {
  let component: InteressadoDialogComponent;
  let fixture: ComponentFixture<InteressadoDialogComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ InteressadoDialogComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(InteressadoDialogComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
