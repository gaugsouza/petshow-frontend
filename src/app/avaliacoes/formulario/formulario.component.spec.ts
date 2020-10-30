import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { FormularioComponent } from './formulario.component';
import { MatListModule } from '@angular/material/list';
import { MatInputModule } from '@angular/material/input';
import { MatSelectModule } from '@angular/material/select';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { HttpClientTestingModule } from '@angular/common/http/testing';
import { LoggerTestingModule } from 'ngx-logger/testing';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { RouterTestingModule } from '@angular/router/testing';
import { TranslateModule, TranslateLoader } from '@ngx-translate/core';
import { MatIconModule } from '@angular/material/icon';

describe('FormularioComponent', () => {
  let component: FormularioComponent;
  let fixture: ComponentFixture<FormularioComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ FormularioComponent ],
      imports: [
        MatListModule,
        MatInputModule,
        MatSelectModule,
        BrowserAnimationsModule,
        HttpClientTestingModule,
        LoggerTestingModule,
        FormsModule,
        RouterTestingModule,
        ReactiveFormsModule,
        TranslateModule.forRoot(),
        MatIconModule
      ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(FormularioComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('Deve trazer a média de um campo específico', () => {
    component.avaliacao = {
      comentario: '',
      atencao: 3,
      custoBeneficio: 2,
      infraestrutura: 1,
      qualidadeProdutos: 2,
      qualidadeServico: 3
    };


    expect(component.getEstrelas('atencao')).toEqual(['star', 'star', 'star', 'star_border', 'star_border']);
  });

  it('Deve adicionar avaliacao', () => {
    const spy = jest.spyOn(component.adicionaAvaliacao, 'emit');

    component.adicionarAvaliacao();
    expect(spy).toHaveBeenCalled();
  })
});
