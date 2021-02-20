import { ComponentFixture, TestBed } from '@angular/core/testing';

import { CadastroComponent } from './cadastro.component';
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
import {EnderecoCadastroComponent} from './endereco-cadastro/endereco-cadastro.component'
import {InfoPessoalCadastroComponent} from './info-pessoal-cadastro/info-pessoal-cadastro.component'
import {CadastroContaComponent} from './cadastro-conta/cadastro-conta.component';
import {TipoPessoa} from '../../enum/tipo-pessoa.enum';
import { JwtHelper } from '../../util/jwt-helper';
import { MatIconModule } from '@angular/material/icon';

describe('CadastroComponent', () => {
  let component: CadastroComponent;
  let fixture: ComponentFixture<CadastroComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ 
        CadastroComponent,
        CadastroContaComponent,
        EnderecoCadastroComponent,
        InfoPessoalCadastroComponent
      ],
      providers: [
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
        MatIconModule
      ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(CadastroComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('Deve colocar tipo-conta como Cliente', () => {
    component.exibirFormCliente();
    expect(component.tipoConta).toEqual(TipoPessoa.CLIENTE);
  });

  it('Deve colocar tipo-conta como prestador', () => {
    component.exibirFormPrestador();
    expect(component.tipoConta).toEqual(TipoPessoa.PRESTADOR_AUTONOMO);
  });

  it('Deve deixar isClient como true', () => {
    component.exibirFormCliente();
    expect(component.isCliente).toBe(true);
  });

  it('Deve deixar isPrestador como true', () => {
    component.exibirFormPrestador();
    expect(component.isPrestador).toBe(true);
  });

  it('Não deve deixar prestador e cliente true ao mesmo tempo', () => {
    component.exibirFormPrestador();
    expect(component.isPrestador).toBe(true);
    component.exibirFormCliente();
    expect(component.isPrestador).toBe(false);
  });

  it('Não deve deixar cliente e prestador true ao mesmo tempo', () => {
    component.exibirFormCliente();
    expect(component.isCliente).toBe(true);
    component.exibirFormPrestador();
    expect(component.isCliente).toBe(false);
  })
});