import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ServicosComponent } from './servicos.component';
import { Router } from '@angular/router';
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
import { MatPaginatorModule } from '@angular/material/paginator';
import { JwtHelper } from '../../util/jwt-helper';
import { NotificationService } from '../../servicos/notification.service';
import { ServicoDetalhado } from '../../interfaces/servico-detalhado';


describe('ServicosComponent', () => {
  let component: ServicosComponent;
  let fixture: ComponentFixture<ServicosComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ServicosComponent ],
      providers: [
        JwtHelper,
        { provide: 'ServicoNotificationService', useFactory: () => (new NotificationService<ServicoDetalhado>()) }
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
       MatPaginatorModule
     ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ServicosComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
