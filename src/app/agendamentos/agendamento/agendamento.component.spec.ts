import { CommonModule } from '@angular/common';
import { HttpClientTestingModule } from '@angular/common/http/testing';
import { ComponentFixture, TestBed } from '@angular/core/testing';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
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
import { JwtHelper } from '../../util/jwt-helper';
import { AnimalEstimacaoComponent } from '../animal-estimacao/animal-estimacao.component';

import { AgendamentoComponent } from './agendamento.component';
import { ClienteComponent } from '../cliente/cliente.component';
import { ConfirmacaoAgendamentoComponent } from '../confirmacao-agendamento/confirmacao-agendamento.component';
import { DadosAgendamentoComponent } from '../dados-agendamento/dados-agendamento.component'
import { ServicoDetalhadoComponent } from '../servico-detalhado/servico-detalhado.component';
import { ActivatedRoute, convertToParamMap, Router } from '@angular/router';
import { of } from 'rxjs';
import { VisualizacaoAgendamentoComponent } from '../visualizacao-agendamento/visualizacao-agendamento.component';
import { AvaliacoesModule } from '../../avaliacoes/avaliacoes.module';
import { MatSelectModule } from '@angular/material/select';
describe('AgendamentoComponent', () => {
  let component: AgendamentoComponent;
  let fixture: ComponentFixture<AgendamentoComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ 
        AgendamentoComponent,
        ClienteComponent,
        AnimalEstimacaoComponent,
        ConfirmacaoAgendamentoComponent,
        DadosAgendamentoComponent,
        ServicoDetalhadoComponent,
        VisualizacaoAgendamentoComponent,
      ],
      providers: [
        JwtHelper,
        {provide: Router, useValue: {navigate: () => true}},
        {provide: ActivatedRoute, useValue: {
          queryParams: of({
            ativo: false
          }),
          snapshot: {
            paramMap: convertToParamMap({
              prestadorId: '1',
              servicoDetalhadoId: '1'
            })
          }
        }},
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
        BrowserAnimationsModule,  
        AvaliacoesModule,
        MatSelectModule,
      ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(AgendamentoComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
