import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { FormularioAnimalComponent } from './formulario-animal.component';
import {MatInputModule} from '@angular/material/input';
import {MatSelectModule} from '@angular/material/select';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { FormsModule } from '@angular/forms';
import { AnimalEstimacao } from '../../../interfaces/AnimalEstimacao';
import { TipoAnimal } from '../../../enum/TipoAnimal';
import { usuariosMock } from '../../../mocks/usuarioMock';
import { Cliente } from '../../../interfaces/cliente';

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

  it('Deve atualizar a lista com animal novo', () => {
    const usuarioMock:Cliente = {...usuariosMock[0]};
    let animalEsperado: AnimalEstimacao = {
      id: 2,
      nome: "Floquinho",
      tipoAnimal: TipoAnimal.CACHORRO
    };
    component.animal = animalEsperado;
    component.adicionaAnimal = (animal) => {
      usuarioMock.animaisEstimacao = [...usuarioMock.animaisEstimacao, animal];
    }

    component.insereAnimal();

    expect(usuarioMock.animaisEstimacao).toContain(animalEsperado);
  });

  it('Deve atualizar animal dentro da lista', () => {
    const usuarioMock:Cliente = {...usuariosMock[0]};
    let animalEsperado: AnimalEstimacao = {
      id: 1,
      nome: "Floquinho",
      tipoAnimal: TipoAnimal.CACHORRO
    };
    component.animal = animalEsperado;
    component.atualizaAnimalInput = animal => {
      usuarioMock.animaisEstimacao = usuarioMock.animaisEstimacao.map(el => el.id === animal.id ? animal : el);
    }

    component.atualizaAnimal();
    expect(usuarioMock.animaisEstimacao).toContain(animalEsperado);
    expect(usuarioMock.animaisEstimacao[0].nome).toEqual(animalEsperado.nome);

  });
});
