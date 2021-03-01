import { ComponentFixture, getTestBed, TestBed } from '@angular/core/testing';
import { JwtHelper } from '../../../util/jwt-helper';
import { EnderecoCadastroComponent } from '../endereco-cadastro/endereco-cadastro.component';
import { InfoPessoalCadastroComponent } from '../info-pessoal-cadastro/info-pessoal-cadastro.component';
import { PoliticaPrivacidadeComponent } from '../politica-privacidade/politica-privacidade.component';
import { ConfigModule } from '../../../config/config.module';
import { MatButtonModule } from '@angular/material/button';
import { CadastroContaComponent } from './cadastro-conta.component';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { MatInputModule } from '@angular/material/input';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatSelectModule } from '@angular/material/select';
import { HttpClientTestingModule } from '@angular/common/http/testing';
import { LoggerTestingModule } from 'ngx-logger/testing';
import { RouterTestingModule } from '@angular/router/testing';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { TipoPessoa } from '../../../enum/tipo-pessoa.enum';
import { monica } from '../../../mocks/usuarioMock';
import { LoginService } from '../../../servicos/login.service';
import { of, throwError } from 'rxjs';
import { Router } from '@angular/router';
import { MatDialogModule } from '@angular/material/dialog';
import { MatIconModule } from '@angular/material/icon';
import {MatCheckboxModule} from '@angular/material/checkbox';
import { CadastroEmpresaComponent } from '../../cadastro-empresa/cadastro-empresa.component';

describe('CadastroContaComponent', () => {
  let component: CadastroContaComponent;
  let fixture: ComponentFixture<CadastroContaComponent>;
  let service: LoginService;
  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ 
        CadastroContaComponent,
        EnderecoCadastroComponent,
        InfoPessoalCadastroComponent,
        PoliticaPrivacidadeComponent,
        CadastroEmpresaComponent
      ],
      providers: [
        JwtHelper,
        {provide: Router, useValue: {navigate: () => true}}
      ],
      imports: [
        ConfigModule,
        FormsModule,
        ReactiveFormsModule,
        MatInputModule,
        MatButtonModule,
        MatFormFieldModule,
        MatSelectModule,
        HttpClientTestingModule,
        RouterTestingModule,
        BrowserAnimationsModule,
        MatDialogModule,
        MatIconModule,
        MatCheckboxModule,
      ]
    })
    .compileComponents();

    let injector = getTestBed();
    service = injector.inject(LoginService);
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(CadastroContaComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('Deve setar um valor para confirmarSenha', ()=> {
    component.repetirSenha('AAAA');
    expect(component.confirmarSenha).toEqual('AAAA');
  });

  it('Deve confirmar se é prestador', () => {
    component.tipoConta = TipoPessoa.PRESTADOR_AUTONOMO;
    expect(component.isPrestador()).toBe(true);
  });

  it('Deve dizer que não é prestador', () => {
    component.tipoConta = TipoPessoa.CLIENTE;
    expect(component.isPrestador()).toBe(false);
  });

  it('Deve dizer que as senhas são iguais', () => {
    component.confirmarSenha = "abc";
    component.usuario.login.senha = "abc";
    expect(component.isSenhasIguais()).toBe(true);
  });

  it('Deve dizer que as senhas são diferentes', () => {
    component.confirmarSenha = "abc";
    component.usuario.login.senha = "def";
    expect(component.isSenhasIguais()).toBe(false);
  });

  it('Deve retornar mensagem de erro de senhas diferentes', () => {
    const spy = jest.spyOn(component, 'isSenhasIguais');
    spy.mockImplementation(() => false);
    component.cadastrarConta(monica);
    expect(component.errorMessage).toBeTruthy();
  });

  it('Deve retornar mensagem de erro generico', () => {
    const esperado = 'Teste';
    const spy = jest.spyOn(component, 'isSenhasIguais');
    const servicoMock = jest.spyOn(service, 'cadastrarUsuario');

    spy.mockImplementation(() => true);
    servicoMock.mockImplementation(_ => throwError(esperado));

    component.cadastrarConta(monica);
    expect(component.erroRequisicao).toEqual(esperado);
  });

  it('Deve redirecionar para login', () => {
    const spy = jest.spyOn(component, 'isSenhasIguais');
    const servicoMock = jest.spyOn(service, 'cadastrarUsuario');
    const spyRedirect = jest.spyOn(component, 'redirect');
    spy.mockImplementation(() => true);
    servicoMock.mockImplementation(_ => of("monica"));
    
    component.cadastrarConta(monica);
    expect(component.redirect).toHaveBeenCalled();

  });
});
