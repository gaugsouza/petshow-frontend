import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { AvaliacaoComponent } from './avaliacao.component';
import {EstrelasComponent} from '../estrelas/estrelas.component';
import {FormularioComponent} from '../formulario/formulario.component';
import { AvaliacaoService } from '../../servicos/avaliacao.service';
import {AvaliacaoServiceMock} from '../../mocks/avaliacao-service-mock';
import { LocalStorageService } from '../../servicos/local-storage.service';
import { Router, ActivatedRoute } from '@angular/router';
import { MatListModule } from '@angular/material/list';
import {MatIconModule} from '@angular/material/icon';
import { MatInputModule } from '@angular/material/input';
import { MatSelectModule } from '@angular/material/select';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { HttpClientTestingModule } from '@angular/common/http/testing';
import { LoggerTestingModule } from 'ngx-logger/testing';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { RouterTestingModule } from '@angular/router/testing';
import { TranslateModule, TranslateLoader } from '@ngx-translate/core';
import { Observable, of } from 'rxjs';
import { JwtHelper } from '../../util/jwt-helper';
import { servicos } from '../../mocks/servico-detalhado-mock';
import { Avaliacao } from '../../interfaces/avaliacao';
import {PrestadorService} from '../../servicos/prestador.service';

describe('AvaliacaoComponent', () => {
  let component: AvaliacaoComponent;
  let fixture: ComponentFixture<AvaliacaoComponent>;
  let service:AvaliacaoService;
  let prestadorService:PrestadorService;
  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ 
        AvaliacaoComponent,
        EstrelasComponent,
        FormularioComponent  
      ],
      providers: [
        AvaliacaoService,
        LocalStorageService,
        {provide: Router, useValue: {navigate:() => true}},
        {provide: ActivatedRoute, useValue: {
          queryParams: of({
            servicoAvaliado: 1,
            prestador: 1
          })
        }},
        JwtHelper,
        PrestadorService
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
        TranslateModule.forRoot()
      ]
    })
    .compileComponents();
    service = TestBed.inject(AvaliacaoService);
    prestadorService = TestBed.inject(PrestadorService);
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(AvaliacaoComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('Deve preencher servico avaliado', async () => {
    let spy = jest.spyOn(component, 'parse');
    // spyAvaliacao.mockImplementation((a, b) => of(JSON.stringify(servicos[0])));
    prestadorService.buscaPrestador = jest.fn().mockImplementationOnce(any => {
      return of(JSON.stringify(servicos[0].prestador));
    })

    service.buscaServicoAvaliadoPorId = jest.fn().mockImplementationOnce(any => {
      return of(JSON.stringify(servicos[0]));
    })
   
    spy.mockImplementationOnce(obj => servicos[0]);


    component.preencheServico(1,2);
    expect(component.servicoAvaliado).toEqual(servicos[0]);
  });


  it('Deve adicionar avaliação', () => {
    let avaliacoes = [...servicos[0].avaliacoes];
    let spy = jest.spyOn(component, 'adicionaAvaliacao');
    spy.mockImplementation(avaliacao => avaliacoes.push(avaliacao));
    const esperado:Avaliacao = {
      qualidadeServico: 5,
      atencao: 5,
      custoBeneficio: 5,
      infraestrutura: 5,
      qualidadeProdutos: 5,
    }
    component.adicionaAvaliacao(esperado);
    expect(avaliacoes).toContainEqual(esperado);
  })
});
