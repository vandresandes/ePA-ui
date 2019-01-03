import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ChecklistCadastroComponent } from './checklist-cadastro.component';

describe('ChecklistCadastroComponent', () => {
  let component: ChecklistCadastroComponent;
  let fixture: ComponentFixture<ChecklistCadastroComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ChecklistCadastroComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ChecklistCadastroComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
