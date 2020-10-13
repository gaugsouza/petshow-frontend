import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { PerfilComponent } from './perfil.component';
import {PerfilUsuarioComponent} from '../perfil-usuario/perfil-usuario.component';
import {PerfilPrestadorComponent} from '../perfil-prestador/perfil-prestador.component';
import { ServicosComponent } from '../perfil-prestador/servicos/servicos.component';
import { FormularioServicoComponent } from '../perfil-prestador/formulario-servico/formulario-servico.component';
import { InformacoesPessoaisComponent } from '../perfil-usuario/informacoes-pessoais/informacoes-pessoais.component';
import { EnderecoComponent } from '../perfil-usuario/endereco/endereco.component';
import { DialogEnderecoComponent } from '../perfil-usuario/endereco/dialog-endereco/dialog-endereco.component';
import { AnimalEstimacaoComponent } from '../perfil-usuario/animal-estimacao/animal-estimacao.component';
import { PrestadorService } from '../servicos/prestador.service';
import { LocalStorageService } from '../servicos/local-storage.service';
import { Router } from '@angular/router';
import { UsuarioService } from '../servicos/usuario.service';
import { UsuarioServiceMock } from '../mocks/usuario-service-mock';
import { MatListModule } from '@angular/material/list';
import { MatInputModule } from '@angular/material/input';
import { MatSelectModule } from '@angular/material/select';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { HttpClientTestingModule } from '@angular/common/http/testing';
import { LoggerTestingModule } from 'ngx-logger/testing';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { RouterTestingModule } from '@angular/router/testing';
import { TranslateModule } from '@ngx-translate/core';
import { MatDialogModule } from '@angular/material/dialog';
import { MatCardModule } from '@angular/material/card';
import { NgxMaskModule } from 'ngx-mask';
import { FormularioAnimalComponent } from '../perfil-usuario/animal-estimacao/formulario-animal/formulario-animal.component';
import { JwtHelper } from '../util/jwt-helper';
describe('PerfilComponent', () => {
  let component: PerfilComponent;
  let fixture: ComponentFixture<PerfilComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ 
        PerfilComponent,
        PerfilUsuarioComponent,
        PerfilPrestadorComponent,
        ServicosComponent,
        FormularioServicoComponent,
        InformacoesPessoaisComponent,
        EnderecoComponent,
        DialogEnderecoComponent,
        AnimalEstimacaoComponent,
        FormularioAnimalComponent
       ],
       providers: [
        PrestadorService,
        LocalStorageService,
        {provide: Router, useValue: {navigate: () => true}},
        {provide: UsuarioService, useClass: UsuarioServiceMock},
        JwtHelper
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
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(PerfilComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
