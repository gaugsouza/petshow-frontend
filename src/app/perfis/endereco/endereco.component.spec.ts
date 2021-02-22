import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { EnderecoComponent } from './endereco.component';
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
import {JwtHelper} from '../../util/jwt-helper';
describe('EnderecoComponent', () => {
  let component: EnderecoComponent;
  let fixture: ComponentFixture<EnderecoComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ EnderecoComponent ],
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
        MatCardModule
      ],
      providers: [
        JwtHelper
      ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(EnderecoComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
