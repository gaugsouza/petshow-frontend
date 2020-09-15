import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { PerfilUsuarioComponent } from './perfil-usuario.component';
import { UsuarioService } from '../servicos/usuario.service';
import { UsuarioServiceMock} from '../mocks/usuario-service-mock';
import { ActivatedRoute, RouterModule, convertToParamMap, Router } from '@angular/router';
import { RouterTestingModule } from '@angular/router/testing';
import { of } from 'rxjs';
import {AnimalEstimacaoComponent} from './animal-estimacao/animal-estimacao.component';
import {FormularioAnimalComponent} from './animal-estimacao/formulario-animal/formulario-animal.component';
import {MatListModule} from '@angular/material/list';
import {MatInputModule} from '@angular/material/input';
import {MatSelectModule} from '@angular/material/select';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { usuariosMock } from '../mocks/usuarioMock';
import { LocalStorageService } from '../servicos/local-storage.service';
import { HttpClientTestingModule } from '@angular/common/http/testing';
import { LoggerTestingModule } from 'ngx-logger/testing';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { AnimalEstimacao } from '../interfaces/AnimalEstimacao';
import { TipoAnimal } from '../enum/TipoAnimal';


describe('FormularioAnimalComponent', () => {
  let component: PerfilUsuarioComponent;
  let fixture: ComponentFixture<PerfilUsuarioComponent>;
  const route = ({ data: of({ label: 'hello' }) } as any) as ActivatedRoute;
  const usuarioMock = usuariosMock[0];
  let localStorageService: LocalStorageService;
  let usuarioService : UsuarioService;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ 
          PerfilUsuarioComponent,
          AnimalEstimacaoComponent,
          // FormularioAnimalComponent
          FormularioAnimalComponent
        ],
      providers: [
          // {provide: UsuarioService, useClass: UsuarioServiceMock},
          LocalStorageService,
          UsuarioService,
          {provide: Router, useValue: {navigate: () => true}}
      ],
      imports: [
        MatListModule,
        MatInputModule,
        MatSelectModule,
        BrowserAnimationsModule,
        HttpClientTestingModule,
        LoggerTestingModule,
        FormsModule,
        RouterTestingModule,
        ReactiveFormsModule
      ]
    })
    .compileComponents();

    localStorageService = TestBed.inject(LocalStorageService);
    usuarioService = TestBed.inject(UsuarioService);
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(PerfilUsuarioComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  beforeEach(() => {
    jest.spyOn(component, 'adicionaAnimal').mockImplementation(animal => {
      component.usuario.animaisEstimacao.push(animal);
    });

    jest.spyOn(component, 'removeAnimal').mockImplementation((animal:AnimalEstimacao) => {
      component.usuario.animaisEstimacao = component.usuario.animaisEstimacao.filter(el => el.id !== animal.id);
    });

    jest.spyOn(component, 'editaAnimal').mockImplementation((animal:AnimalEstimacao) => {
      component.usuario.animaisEstimacao = component.usuario.animaisEstimacao.map(el => el.id === animal.id ? animal : el);
    })
  })

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('Deve setar usuario igual ao de localStorage', () => {
    localStorageService.setItem('usuario', usuarioMock);
    component.getUsuario();
    expect(component.usuario).toEqual(usuarioMock);
  });

  it('Deve deixar usuario indefinido', () => {
    component.getUsuario();
    expect(component.usuario).toBeFalsy();
  });

  it('Deve adicionar um animal a lista de animais', () => {
    component.usuario = usuarioMock;
    let animalEsperado: AnimalEstimacao = {
      id: 2,
      nome: "Floquinho",
      tipo: TipoAnimal.CACHORRO
    };
    
    component.adicionaAnimal(animalEsperado);
    expect(component.usuario.animaisEstimacao).toContain(animalEsperado);
  });

  it('Deve remover um animal da lista de animais', () => {
    component.usuario = usuarioMock;
    let animalARemover: AnimalEstimacao = {
      id: 2,
      nome: "Floquinho",
      tipo: TipoAnimal.CACHORRO
    };
    component.adicionaAnimal(animalARemover);

    component.removeAnimal(animalARemover);

    expect(component.usuario.animaisEstimacao).not.toContain(animalARemover);
  });

  it('Deve retornar um animal editado', () => {
    component.usuario = usuarioMock;
    let nomeEsperado = "Mingau";
    let animalAEditar: AnimalEstimacao = {
      id: 2,
      nome: "Floquinho",
      tipo: TipoAnimal.CACHORRO
    };

    component.adicionaAnimal({...animalAEditar});
    animalAEditar.nome = nomeEsperado;
    component.editaAnimal(animalAEditar);
    expect(component.usuario.animaisEstimacao.find(animal => animal.id === 2).nome).toEqual(nomeEsperado);
  });

  it('Deve selecionar o animal', () => {
    let animal: AnimalEstimacao = {
      id: 2,
      nome: "Floquinho",
      tipo: TipoAnimal.CACHORRO
    };

    component.selecionaAnimal(animal);

    expect(component.animal).toEqual(animal);
  });

  it('Deve renderizar com formulário ativo', () => {
    component.animal = {
      id: 2,
      nome: "Floquinho",
      tipo: TipoAnimal.CACHORRO
    };

    fixture.detectChanges();
    const element: HTMLElement = fixture.nativeElement;
    const form = element.getElementsByClassName('form');
    expect(form).not.toBeNull();
  });
});
