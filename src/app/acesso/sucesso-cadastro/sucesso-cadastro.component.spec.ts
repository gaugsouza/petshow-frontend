import { HttpClientTestingModule } from '@angular/common/http/testing';
import { ComponentFixture, TestBed } from '@angular/core/testing';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { MatButtonModule } from '@angular/material/button';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { MatSelectModule } from '@angular/material/select';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { ActivatedRoute, Router } from '@angular/router';
import { of } from 'rxjs';
import { ConfigModule } from '../../config/config.module';
import { LoginService } from '../../servicos/login.service';
import { JwtHelper } from '../../util/jwt-helper';

import { SucessoCadastroComponent } from './sucesso-cadastro.component';

describe('SucessoCadastroComponent', () => {
  let component: SucessoCadastroComponent;
  let fixture: ComponentFixture<SucessoCadastroComponent>;
  let route:ActivatedRoute;
  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ SucessoCadastroComponent ],
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
    route = TestBed.inject(ActivatedRoute);
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(SucessoCadastroComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
