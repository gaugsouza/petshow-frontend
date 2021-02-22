import { HttpClientTestingModule } from '@angular/common/http/testing';
import { ComponentFixture, TestBed } from '@angular/core/testing';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { MatCardModule } from '@angular/material/card';
import { MatDialogModule } from '@angular/material/dialog';
import { MatInputModule } from '@angular/material/input';
import { MatListModule } from '@angular/material/list';
import { MatPaginatorModule } from '@angular/material/paginator';
import { MatSelectModule } from '@angular/material/select';
import { MatTooltipModule } from '@angular/material/tooltip';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { RouterTestingModule } from '@angular/router/testing';
import { TranslateModule } from '@ngx-translate/core';
import { LoggerTestingModule } from 'ngx-logger/testing';
import { NgxMaskModule } from 'ngx-mask';
import { LoginService } from '../../servicos/login.service';
import { JwtHelper } from '../../util/jwt-helper';
import { MensagemAtivacaoComponent } from './mensagem-ativacao.component';

describe('MensagemAtivacaoComponent', () => {
  let component: MensagemAtivacaoComponent;
  let fixture: ComponentFixture<MensagemAtivacaoComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ MensagemAtivacaoComponent ],
      providers: [
        LoginService,
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
        NgxMaskModule.forRoot(),
        MatPaginatorModule,
        MatTooltipModule
      ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(MensagemAtivacaoComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
