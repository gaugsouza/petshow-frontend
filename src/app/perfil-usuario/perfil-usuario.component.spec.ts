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
import {TranslateModule} from '@ngx-translate/core';
import { Cliente } from '../interfaces/cliente';
import { USUARIO_TOKEN } from '../util/constantes';
import {InformacoesPessoaisComponent} from './informacoes-pessoais/informacoes-pessoais.component';
import {EnderecoComponent} from './endereco/endereco.component';
import {DialogEnderecoComponent} from './endereco/dialog-endereco/dialog-endereco.component';
import {MatDialogModule} from '@angular/material/dialog'; 
import {MatCardModule} from '@angular/material/card';
import {NgxMaskModule} from 'ngx-mask';


describe('FormularioAnimalComponent', () => {
  let component: PerfilUsuarioComponent;
  let fixture: ComponentFixture<PerfilUsuarioComponent>;
  const route = ({ data: of({ label: 'hello' }) } as any) as ActivatedRoute;
  const usuarioMock = (usuariosMock[0] as Cliente);
  let localStorageService: LocalStorageService;
  // let usuarioService : UsuarioService;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ 
          PerfilUsuarioComponent,
          AnimalEstimacaoComponent,
          FormularioAnimalComponent,
          InformacoesPessoaisComponent,
          EnderecoComponent,
          DialogEnderecoComponent
        ],
      providers: [
          {provide: UsuarioService, useClass: UsuarioServiceMock},
          LocalStorageService,
          // UsuarioService,
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
        ReactiveFormsModule,
        TranslateModule.forRoot(),
        MatDialogModule,
        MatCardModule,
        NgxMaskModule.forRoot()
      ]
    })
    .compileComponents();

    localStorageService = TestBed.inject(LocalStorageService);
    // usuarioService = TestBed.inject(UsuarioService);
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(PerfilUsuarioComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('Deve setar token igual ao de localStorage', () => {
    localStorageService.setItem(USUARIO_TOKEN, usuarioMock.id);
    component.getUsuario();
    expect(component.usuario.id).toEqual(usuarioMock.id);
  });

  it('Deve deixar usuario indefinido', () => {
    component.getUsuario();
    expect(component.usuario).toBeFalsy();
  });

  it('Deve adicionar um animal a lista de animais', () => {
    localStorageService.setItem(USUARIO_TOKEN, usuarioMock.id);
    component.getUsuario();
    let animalEsperado: AnimalEstimacao = {
      id: 2,
      nome: "Floquinho",
      tipo: TipoAnimal.CACHORRO,
      dono: {
        ...usuarioMock
      }
    };
    component.adicionaAnimal(animalEsperado);
    let animalAdicionado = component.usuario.animaisEstimacao.find(animal => animal.id === animalEsperado.id);
    expect(animalAdicionado).toBeTruthy();
  });

  // it('Deve remover um animal da lista de animais', () => {
  //   component.usuario = usuarioMock;
  //   let animalARemover: AnimalEstimacao = {
  //     id: 2,
  //     nome: "Floquinho",
  //     tipo: TipoAnimal.CACHORRO
  //   };
  //   component.adicionaAnimal(animalARemover);

  //   component.removeAnimal(animalARemover);

  //   expect(component.usuario.animaisEstimacao).not.toContain(animalARemover);
  // });

  // it('Deve retornar um animal editado', () => {
  //   component.usuario = usuarioMock;
  //   let nomeEsperado = "Mingau";
  //   let animalAEditar: AnimalEstimacao = {
  //     id: 2,
  //     nome: "Floquinho",
  //     tipo: TipoAnimal.CACHORRO
  //   };

  //   component.adicionaAnimal({...animalAEditar});
  //   animalAEditar.nome = nomeEsperado;
  //   component.editaAnimal(animalAEditar);
  //   expect(component.usuario.animaisEstimacao.find(animal => animal.id === 2).nome).toEqual(nomeEsperado);
  // });

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
