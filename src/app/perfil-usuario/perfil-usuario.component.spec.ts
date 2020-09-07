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


describe('FormularioAnimalComponent', () => {
  let component: PerfilUsuarioComponent;
  let fixture: ComponentFixture<PerfilUsuarioComponent>;
  const route = ({ data: of({ label: 'hello' }) } as any) as ActivatedRoute;
  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ 
          PerfilUsuarioComponent,
          AnimalEstimacaoComponent,
          FormularioAnimalComponent
        ],
      providers: [
          {provide: UsuarioService, useClass: UsuarioServiceMock},
          {
            provide: ActivatedRoute,
            useValue: {
              snapshot: {
                paramMap: convertToParamMap({
                  id: '1'
                })
              }
            }
          }
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
    fixture = TestBed.createComponent(PerfilUsuarioComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
