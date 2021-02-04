import { ComponentFixture, TestBed } from '@angular/core/testing';
import { HttpClientTestingModule } from '@angular/common/http/testing';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { MatInputModule } from '@angular/material/input';
import { MatPaginatorModule } from '@angular/material/paginator';
import { MatSelectModule } from '@angular/material/select';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import {TranslateModule} from '@ngx-translate/core';
import { LoggerTestingModule } from 'ngx-logger/testing';
import { JwtHelper } from '../../util/jwt-helper';
import { ConfigModule } from '../../config/config.module';
import { MatListModule } from '@angular/material/list';
import { CommonModule } from '@angular/common';
import { MatButtonModule } from '@angular/material/button';
import { MatNativeDateModule } from '@angular/material/core';
import { MatStepperModule } from '@angular/material/stepper';
import { MatCardModule } from '@angular/material/card';
import { MatCheckboxModule } from '@angular/material/checkbox';
import { MatTabsModule } from '@angular/material/tabs';
import { NotificationService } from '../../servicos/notification.service';
import { Agendamento } from '../../interfaces/agendamento';
import { AgendaClienteComponent } from './agenda-cliente.component';
import { MatDialog, MatDialogModule } from '@angular/material/dialog';

describe('AgendaClienteComponent', () => {
  let component: AgendaClienteComponent;
  let fixture: ComponentFixture<AgendaClienteComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ AgendaClienteComponent ],
      providers: [
        JwtHelper,
        { provide: 'AgendamentoNotificationService', useFactory: () => (new NotificationService<Agendamento>()) }

      ],
      imports: [
        MatListModule,
        MatInputModule,
        MatSelectModule,
        MatDialogModule,
        BrowserAnimationsModule,
        FormsModule,
        ReactiveFormsModule,
        TranslateModule.forRoot(),
        HttpClientTestingModule,
        LoggerTestingModule,
        MatPaginatorModule,
        ConfigModule,
        CommonModule,
        MatCheckboxModule,
        MatCardModule,
        MatTabsModule,
        MatStepperModule,
        MatButtonModule,
        MatNativeDateModule
      ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(AgendaClienteComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
