import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import {MatButtonModule} from '@angular/material/button';
import {MatListModule} from '@angular/material/list';
import {MatInputModule} from '@angular/material/input';
import {MatSelectModule} from '@angular/material/select';
import { LoginComponent } from './login.component';
import { RouterTestingModule } from '@angular/router/testing';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { Router } from '@angular/router';
import { HttpClientTestingModule } from '@angular/common/http/testing';
import { LoggerTestingModule } from 'ngx-logger/testing';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import {AppComponent } from '../../app.component';
import { TranslateModule } from '@ngx-translate/core';
import {MatIconModule} from '@angular/material/icon';
import {MatToolbarModule} from '@angular/material/toolbar';
import {MatSidenavModule} from '@angular/material/sidenav'; 
import { MatFormFieldModule } from '@angular/material/form-field';
import { ConfigModule } from '../../config/config.module';
import { JwtHelper } from '../../util/jwt-helper';
import { LoginService } from '../../servicos/login.service';
import { of, throwError } from 'rxjs';

describe('LoginComponent', () => {
  let component: LoginComponent;
  let fixture: ComponentFixture<LoginComponent>;
  let service: LoginService

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ 
        LoginComponent
      ],
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
        JwtHelper,
        LoginService
      ],
    })
    .compileComponents();
    service = TestBed.inject(LoginService);
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(LoginComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('Deve retornar erro', () => {
    const esperado = 'Teste';
    let spyService = jest.spyOn(service, 'realizaLogin');
    spyService.mockImplementation(login => throwError(esperado));

    component.realizaLogin();
    expect(component.errorMessage).toEqual(esperado);
  });

  it('Deve redirecionar para a pagina do perfil', () => {
    let spy = jest.spyOn(component, 'redirect');
    let spyService = jest.spyOn(service, 'realizaLogin');
    spyService.mockImplementation(login => of('aaa'));

    component.realizaLogin();
    expect(spy).toHaveBeenCalled();
  });
});
