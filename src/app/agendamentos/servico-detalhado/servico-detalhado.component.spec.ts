import { CommonModule } from '@angular/common';
import { HttpClientTestingModule } from '@angular/common/http/testing';
import { ComponentFixture, TestBed } from '@angular/core/testing';
import { FormsModule } from '@angular/forms';
import { MatButtonModule } from '@angular/material/button';
import { MatCardModule } from '@angular/material/card';
import { MatCheckboxModule } from '@angular/material/checkbox';
import { MatNativeDateModule } from '@angular/material/core';
import { MatDatepickerModule } from '@angular/material/datepicker';
import { MatInputModule } from '@angular/material/input';
import { MatListModule } from '@angular/material/list';
import { MatPaginatorModule } from '@angular/material/paginator';
import { MatStepperModule } from '@angular/material/stepper';
import { MatTabsModule } from '@angular/material/tabs';
import { LoggerTestingModule } from 'ngx-logger/testing';
import { ConfigModule } from '../../config/config.module';

import { ServicoDetalhadoComponent } from './servico-detalhado.component';
import {JwtHelper } from '../../util/jwt-helper';
import { MatSelectModule } from '@angular/material/select';
describe('ServicoDetalhadoComponent', () => {
  let component: ServicoDetalhadoComponent;
  let fixture: ComponentFixture<ServicoDetalhadoComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ ServicoDetalhadoComponent ],
      providers: [
        JwtHelper
      ],
      imports: [
        CommonModule,
        ConfigModule,
        MatPaginatorModule,
        MatListModule,
        MatCheckboxModule,
        MatCardModule,
        MatInputModule,
        FormsModule,
        MatTabsModule,
        MatStepperModule,
        MatButtonModule,
        MatDatepickerModule,
        MatNativeDateModule,
        HttpClientTestingModule,
        LoggerTestingModule,
        MatListModule,
        MatSelectModule
      ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(ServicoDetalhadoComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
