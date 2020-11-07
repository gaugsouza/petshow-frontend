import { HttpClientTestingModule } from '@angular/common/http/testing';
import { ComponentFixture, TestBed } from '@angular/core/testing';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { MatButtonModule } from '@angular/material/button';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { MatSelectModule } from '@angular/material/select';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { ActivatedRoute, Router } from '@angular/router';
import { exception } from 'console';
import { of, throwError } from 'rxjs';
import { ConfigModule } from '../../config/config.module';
import { LoginService } from '../../servicos/login.service';
import { JwtHelper } from '../../util/jwt-helper';

import { TokenAtivacaoComponent } from './token-ativacao.component';

describe('TokenAtivacaoComponent', () => {
  let component: TokenAtivacaoComponent;
  let fixture: ComponentFixture<TokenAtivacaoComponent>;
  let service: LoginService;
  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ TokenAtivacaoComponent ],
      imports: [
        FormsModule,
        ReactiveFormsModule,
        MatInputModule,
        MatButtonModule,
        MatFormFieldModule,
        MatSelectModule,
        ConfigModule,
        HttpClientTestingModule,
        BrowserAnimationsModule
      ],
      providers: [
        {provide: Router, useValue: {navigate: () => true}},
        {provide: ActivatedRoute, useValue: {
          queryParams: of({
            token: 'asdgasdga'
          })
        }},
        LoginService,
        JwtHelper
      ]
    })
    .compileComponents();
    service = TestBed.inject(LoginService);
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(TokenAtivacaoComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('Deve redirecionar', () => {
    let spyRedirect = jest.spyOn(component, 'redirect');
    let spyService = jest.spyOn(service, 'ativaConta');
    spyService.mockImplementation(token => of('aaaa'));
    component.ativaConta();
    expect(spyRedirect).toHaveBeenCalled();
  });

  it('Deve retornar erro', () => {
    let spyService = jest.spyOn(service, 'ativaConta');
    spyService.mockImplementation(token => {
      return throwError('teste');
    });

    component.ativaConta();

    expect(component.possuiErros).toBeTruthy();
  })


});
