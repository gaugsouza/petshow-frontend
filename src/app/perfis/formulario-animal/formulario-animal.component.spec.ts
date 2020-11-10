import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { FormularioAnimalComponent } from './formulario-animal.component';
import {MatInputModule} from '@angular/material/input';
import {MatSelectModule} from '@angular/material/select';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { AnimalEstimacao } from '../../interfaces/animalEstimacao';
import { TipoAnimal } from '../../enum/TipoAnimal';
import { usuariosMock } from '../../mocks/usuarioMock';
import { Cliente } from '../../interfaces/cliente';
import {TranslateModule} from '@ngx-translate/core';
import { HttpClientTestingModule } from '@angular/common/http/testing';
import { LoggerTestingModule } from 'ngx-logger/testing';
import { JwtHelper } from '../../util/jwt-helper';


describe('FormularioAnimalComponent', () => {
  let component: FormularioAnimalComponent;
  let fixture: ComponentFixture<FormularioAnimalComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ FormularioAnimalComponent ],
      providers: [
        JwtHelper
      ],
      imports: [
        MatInputModule,
        MatSelectModule,
        BrowserAnimationsModule,
        FormsModule,
        ReactiveFormsModule,
        TranslateModule,
        HttpClientTestingModule,
        LoggerTestingModule
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

  it('Deve atualizar a lista com animal novo', () => {
    const usuarioMock:Cliente = {...usuariosMock[0]};
    let animalEsperado: AnimalEstimacao = {
      id: 2,
      nome: "Floquinho",
      tipo: {
        id: 1,
        nome: "CACHORRO"
      }
    };
    component.animal = animalEsperado;
    let spy = jest.spyOn(component.adicionaAnimal, 'emit');
    spy.mockImplementation(animal => {
      usuarioMock.animaisEstimacao = [...usuarioMock.animaisEstimacao, animal];
    })
    // component.adicionaAnimal = (animal) => {
    //   usuarioMock.animaisEstimacao = [...usuarioMock.animaisEstimacao, animal];
    // }

    component.insereAnimal();

    expect(usuarioMock.animaisEstimacao).toContain(animalEsperado);
  });

  it('Deve atualizar animal dentro da lista', () => {
    const usuarioMock:Cliente = {...usuariosMock[0]};
    let animalEsperado: AnimalEstimacao = {
      id: 1,
      nome: "Floquinho",
      tipo: {id: 1, nome: "CACHORRO"}
    };
    component.animal = animalEsperado;
    let spy = jest.spyOn(component.atualizaAnimalInput, 'emit');
    spy.mockImplementation(animal => {
      usuarioMock.animaisEstimacao = usuarioMock.animaisEstimacao.map(el => el.id === animal.id ? animal : el);
    });

    component.atualizaAnimal();
    expect(usuarioMock.animaisEstimacao).toContain(animalEsperado);
    expect(usuarioMock.animaisEstimacao[0].nome).toEqual(animalEsperado.nome);

  });
});
