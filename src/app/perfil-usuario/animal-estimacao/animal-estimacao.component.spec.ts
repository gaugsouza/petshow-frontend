import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { AnimalEstimacaoComponent } from './animal-estimacao.component';
import {MatListModule} from '@angular/material/list';
import {FormularioAnimalComponent} from './formulario-animal/formulario-animal.component';
import {MatInputModule} from '@angular/material/input';
import {MatSelectModule} from '@angular/material/select';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { By } from '@angular/platform-browser';
import { AnimalEstimacao } from '../../interfaces/AnimalEstimacao';
import { usuariosMock} from '../../mocks/usuarioMock';
import {Cliente} from '../../interfaces/cliente';
import { FormsModule } from '@angular/forms';
import {TranslateModule, TranslateService, TranslateStore, TranslateLoader, TranslateCompiler, TranslateParser, MissingTranslationHandler, USE_DEFAULT_LANG, USE_EXTEND} from '@ngx-translate/core';


describe('AnimalEstimacaoComponent', () => {
  let component: AnimalEstimacaoComponent;
  let fixture: ComponentFixture<AnimalEstimacaoComponent>;

  let animaisMock : AnimalEstimacao[] = (usuariosMock[0] as Cliente).animaisEstimacao;
  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ 
        AnimalEstimacaoComponent
      ],
      imports: [
        MatListModule,
        MatInputModule,
        MatSelectModule,
        BrowserAnimationsModule,
        FormsModule,
        TranslateModule.forRoot()
      ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(AnimalEstimacaoComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('Deve não trazer nenhum animal', () => {
    const element: HTMLElement = fixture.nativeElement;
    const matListArr = element.getElementsByTagName('mat-list-item');
    expect(matListArr.length).toEqual(0);
    expect(element.textContent).not.toContain((usuariosMock[0] as Cliente).animaisEstimacao[0].nome)
  });

  it('Deve trazer uma lista de animais', () => {
    component.animaisEstimacao = animaisMock;
    fixture.detectChanges();
    const element: HTMLElement = fixture.nativeElement;
    const matListArr = element.getElementsByTagName('mat-list-item');
    console.log(element.textContent);
    expect(matListArr.length).toEqual(animaisMock.length);
  });

  it('Deve selecionar um animal', () => {
    let animal: AnimalEstimacao = null;
    component.animaisEstimacao = animaisMock;
    component.selecionaAnimal = (animalSel: AnimalEstimacao) => {
      animal = animalSel;
    }
    component.selecionaAnimal(component.animaisEstimacao[0]);
    expect(animal).toEqual(component.animaisEstimacao[0]);
  });

  it('Deve remover um animal', () => {
    component.animaisEstimacao = animaisMock;
    let animal = animaisMock[0];

    let spy = jest.spyOn(component.removerAnimal, 'emit');

    spy.mockImplementation(animal => {
      component.animaisEstimacao = component.animaisEstimacao.filter((el:AnimalEstimacao) => el.id !== animal.id);
    });

    component.removeAnimal(animal);

    expect(component.animaisEstimacao).not.toContain(animal);
  });
});
