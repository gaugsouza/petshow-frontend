import { HttpClientTestingModule } from '@angular/common/http/testing';
import { ComponentFixture, TestBed } from '@angular/core/testing';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { MatInputModule } from '@angular/material/input';
import { MatPaginatorModule } from '@angular/material/paginator';
import { MatSelectModule } from '@angular/material/select';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import {TranslateModule} from '@ngx-translate/core';
import { LoggerTestingModule } from 'ngx-logger/testing';
import { JwtHelper } from '../../util/jwt-helper';
import { ConfigModule } from '../../config/config.module';
import { AgendaPrestadorComponent } from './agenda-prestador.component';
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

describe('AgendaPrestadorComponent', () => {
  let component: AgendaPrestadorComponent;
  let fixture: ComponentFixture<AgendaPrestadorComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ AgendaPrestadorComponent ],
      providers: [
        JwtHelper,
        { provide: 'AgendamentoNotificationService', useFactory: () => (new NotificationService<Agendamento>()) }

      ],
      imports: [
        MatListModule,
        MatInputModule,
        MatSelectModule,
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
    fixture = TestBed.createComponent(AgendaPrestadorComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
