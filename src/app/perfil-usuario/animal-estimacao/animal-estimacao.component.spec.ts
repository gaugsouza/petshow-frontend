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
describe('AnimalEstimacaoComponent', () => {
  let component: AnimalEstimacaoComponent;
  let fixture: ComponentFixture<AnimalEstimacaoComponent>;

  let animaisMock : AnimalEstimacao[] = (usuariosMock[0] as Cliente).animaisEstimacao;
  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ 
        AnimalEstimacaoComponent,
        FormularioAnimalComponent 
      ],
      imports: [
        MatListModule,
        MatInputModule,
        MatSelectModule,
        BrowserAnimationsModule
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
    expect(element.textContent).toContain('Nenhum animal cadastrado');
  });

  it('Deve trazer uma lista de animais', () => {
    component.animaisEstimacao = animaisMock;
    fixture.detectChanges();
    const element: HTMLElement = fixture.nativeElement;
    const matListArr = element.getElementsByTagName('mat-list-item');
    console.log(element.textContent);
    expect(matListArr.length).toEqual(animaisMock.length);
  })
});
