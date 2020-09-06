import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { FormularioAnimalComponent } from './formulario-animal.component';

describe('FormularioAnimalComponent', () => {
  let component: FormularioAnimalComponent;
  let fixture: ComponentFixture<FormularioAnimalComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ FormularioAnimalComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(FormularioAnimalComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
