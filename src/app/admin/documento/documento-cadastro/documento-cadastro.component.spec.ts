import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { DocumentoCadastroComponent } from './documento-cadastro.component';

describe('DocumentoCadastroComponent', () => {
  let component: DocumentoCadastroComponent;
  let fixture: ComponentFixture<DocumentoCadastroComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ DocumentoCadastroComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(DocumentoCadastroComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
