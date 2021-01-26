import { ComponentFixture, TestBed } from '@angular/core/testing';
import { CommonModule } from '@angular/common';
import { ConfigModule } from '../../config/config.module';
import { MatPaginatorModule } from '@angular/material/paginator';
import { MatListModule } from '@angular/material/list';
import { MatCheckboxModule } from '@angular/material/checkbox'; 
import { MatCardModule } from '@angular/material/card';
import { MatInputModule } from '@angular/material/input'; 
import { FormsModule } from '@angular/forms';
import { MatTabsModule } from '@angular/material/tabs';
import { MatStepperModule } from '@angular/material/stepper';
import { MatButtonModule } from '@angular/material/button';
import {MatDatepickerModule} from '@angular/material/datepicker'; 
import { MatNativeDateModule } from '@angular/material/core/';
import { ConfirmacaoAgendamentoComponent } from './confirmacao-agendamento.component';
import { HttpClientTestingModule } from '@angular/common/http/testing';
import { LoggerTestingModule } from 'ngx-logger/testing';

describe('ConfirmacaoAgendamentoComponent', () => {
  let component: ConfirmacaoAgendamentoComponent;
  let fixture: ComponentFixture<ConfirmacaoAgendamentoComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ ConfirmacaoAgendamentoComponent ],
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
      ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(ConfirmacaoAgendamentoComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
