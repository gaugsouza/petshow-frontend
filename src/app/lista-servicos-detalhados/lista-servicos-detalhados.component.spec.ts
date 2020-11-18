import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ListaServicosDetalhadosComponent } from './lista-servicos-detalhados.component';
import { MatListModule } from '@angular/material/list';
import { MatSelectModule } from '@angular/material/select';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { MatInputModule } from '@angular/material/input';
import { HttpClientTestingModule } from '@angular/common/http/testing';
import { LoggerTestingModule } from 'ngx-logger/testing';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { RouterTestingModule } from '@angular/router/testing';
import { TranslateModule } from '@ngx-translate/core';
import { ServicosService } from '../servicos/servicos.service';
import { Router, ActivatedRoute, convertToParamMap } from '@angular/router';
import { of } from 'rxjs';
import { JwtHelper } from '../util/jwt-helper';
import { servicos } from '../mocks/servico-detalhado-mock';
import { MatPaginatorModule } from '@angular/material/paginator';

describe('ListaServicosDetalhadosComponent', () => {
  let component: ListaServicosDetalhadosComponent;
  let fixture: ComponentFixture<ListaServicosDetalhadosComponent>;
  let service: ServicosService;
  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ 
        ListaServicosDetalhadosComponent,
      ],
      providers:[
        ServicosService,
        {provide: Router, useValue: {navigate: () => true}},
        {provide: ActivatedRoute, useValue: {
          queryParams: of({
            servicoAvaliado: 1,
            prestador: 1
          }),
          snapshot: {
            paramMap: convertToParamMap({
              id: '1'
            })
          }
        }},
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
        MatPaginatorModule
      ]
    })
    .compileComponents();
    service = TestBed.inject(ServicosService);
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(ListaServicosDetalhadosComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});