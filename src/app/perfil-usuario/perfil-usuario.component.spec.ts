import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { PerfilUsuarioComponent } from './perfil-usuario.component';
import { UsuarioService } from '../servicos/usuario.service';
import { UsuarioServiceMock} from '../mocks/usuario-service-mock';
import { ActivatedRoute, RouterModule, convertToParamMap } from '@angular/router';
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
          FormularioAnimalComponent
        ],
      providers: [
          // {provide: UsuarioService, useClass: UsuarioServiceMock},
          LocalStorageService,
          UsuarioService
      ],
      imports: [
        MatListModule,
        MatInputModule,
        MatSelectModule,
        BrowserAnimationsModule,
        HttpClientTestingModule,
        LoggerTestingModule
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

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('Deve setar usuario igual ao de localStorage', () => {
    localStorageService.setItem('usuario', usuarioMock);
    component.getUsuario();
    expect(component.usuario).toEqual(usuarioMock);
  });

  it('Deve deixar usuario nulo', () => {
    component.getUsuario();
    expect(component.usuario).toBeNull();
  })
});
