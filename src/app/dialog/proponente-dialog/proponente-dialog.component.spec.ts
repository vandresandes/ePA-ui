import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ProponenteDialogComponent } from './proponente-dialog.component';

describe('ProponenteDialogComponent', () => {
  let component: ProponenteDialogComponent;
  let fixture: ComponentFixture<ProponenteDialogComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ProponenteDialogComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ProponenteDialogComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
