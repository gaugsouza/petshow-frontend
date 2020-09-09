import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { FormularioAnimalComponent } from './formulario-animal.component';
import {MatInputModule} from '@angular/material/input';
import {MatSelectModule} from '@angular/material/select';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { FormsModule } from '@angular/forms';

describe('FormularioAnimalComponent', () => {
  let component: FormularioAnimalComponent;
  let fixture: ComponentFixture<FormularioAnimalComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ FormularioAnimalComponent ],
      imports: [
        MatInputModule,
        MatSelectModule,
        BrowserAnimationsModule,
        FormsModule
      ]
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
