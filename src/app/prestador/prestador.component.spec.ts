import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { PrestadorComponent } from './prestador.component';
import { PrestadorService } from '../servicos/prestador.service';
import { LocalStorageService } from '../servicos/local-storage.service';
import { Router, ActivatedRoute } from '@angular/router';
import { of } from 'rxjs';
import { MatListModule } from '@angular/material/list';
import { MatInputModule } from '@angular/material/input';
import { MatSelectModule } from '@angular/material/select';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { HttpClientTestingModule } from '@angular/common/http/testing';
import { LoggerTestingModule } from 'ngx-logger/testing';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { RouterTestingModule } from '@angular/router/testing';
import { MatIconModule } from '@angular/material/icon';
import { TranslateModule } from '@ngx-translate/core';
import { MatCardModule } from '@angular/material/card';
import { JwtHelper } from '../util/jwt-helper';
import { servicos } from '../mocks/servico-detalhado-mock';
import { prestadores } from '../mocks/prestador-mock';
describe('PrestadorComponent', () => {
  let component: PrestadorComponent;
  let fixture: ComponentFixture<PrestadorComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ PrestadorComponent ],
      providers: [
        PrestadorService,
        LocalStorageService,
        {provide: Router, useValue: {navigate:() => true}},
        {provide: ActivatedRoute, useValue: {
          queryParams: of({
            servicoAvaliado: 1,
            prestador: 1,
            idPrestador: 1
          })
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
        MatIconModule,
        TranslateModule.forRoot(),
        MatCardModule
      ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(PrestadorComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('Deve retornar média de avaliaçoes', () => {
    let servico = servicos[0];
    let avaliacoes = servico.avaliacoes;
    const esperado = avaliacoes.reduce((total, avaliacao) => total += avaliacao.media, 0) / avaliacoes.length;

    expect(component.getMediaAvaliacoes(servico)).toEqual(esperado);
  });

  it('Deve retornar média de prestador', () => {
    let prestador = prestadores[0];
    let esperado = prestador.servicos.reduce((soma, servico) => {
      return soma += component.getMediaAvaliacoes(servico);
    }, 0) / prestador.servicos.length;

    component.prestador = prestador;
  })
});
