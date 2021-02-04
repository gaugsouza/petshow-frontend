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
import { FormularioComponent} from '../../avaliacoes/formulario/formulario.component';
import { ConfigModule } from '../../config/config.module';
import { AvaliacaoAgendamentoComponent } from '../../avaliacoes/avaliacao-agendamento/avaliacao-agendamento.component'
import { VisualizacaoAgendamentoComponent } from './visualizacao-agendamento.component';
import { DadosAgendamentoComponent } from '../dados-agendamento/dados-agendamento.component';
import { ActivatedRoute, convertToParamMap, Router } from '@angular/router';
import { of } from 'rxjs';
import { JwtHelper } from '../../util/jwt-helper';
import { MatIconModule } from '@angular/material/icon';
describe('VisualizacaoAgendamentoComponent', () => {
  let component: VisualizacaoAgendamentoComponent;
  let fixture: ComponentFixture<VisualizacaoAgendamentoComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ 
        VisualizacaoAgendamentoComponent,
        DadosAgendamentoComponent,
        FormularioComponent,
        AvaliacaoAgendamentoComponent
       ],
       providers: [
        {provide: Router, useValue: {navigate: () => true}},
        {provide: ActivatedRoute, useValue: {
          queryParams: of({
            ativo: false
          }),
          snapshot: {
            paramMap: convertToParamMap({
              idAgendamento: '1'
            })
          }
        }},
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
        MatIconModule
        
      ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(VisualizacaoAgendamentoComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
