import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { AnimalEstimacaoComponent } from './animal-estimacao.component';
import {MatListModule} from '@angular/material/list';
import {MatInputModule} from '@angular/material/input';
import {MatSelectModule} from '@angular/material/select';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { AnimalEstimacao } from '../../interfaces/animalEstimacao';
import { usuariosMock} from '../../mocks/usuarioMock';
import {Cliente} from '../../interfaces/cliente';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import {TranslateModule} from '@ngx-translate/core';
import { MatPaginatorModule } from '@angular/material/paginator';
import { HttpClientTestingModule } from '@angular/common/http/testing';
import { LoggerTestingModule } from 'ngx-logger/testing';
import { JwtHelper } from '../../util/jwt-helper';
import { NotificationService } from '../../servicos/notification.service';
import { MatDialogModule, MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { ConfigModule } from '../../config/config.module';
import { CommonModule } from '@angular/common';
import { MatCardModule } from '@angular/material/card';
import { MatCheckboxModule } from '@angular/material/checkbox';
import { MatTabsModule } from '@angular/material/tabs';
import { MatStepperModule } from '@angular/material/stepper';
import { MatButtonModule } from '@angular/material/button';
import { MatNativeDateModule } from '@angular/material/core';
import { ConfirmacaoCancelamentoComponent } from '../confirmacao-cancelamento/confirmacao-cancelamento.component';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatTooltipModule } from '@angular/material/tooltip';
import { MatExpansionModule } from '@angular/material/expansion';
import { MatChipsModule } from '@angular/material/chips';
import { MatIconModule } from '@angular/material/icon';
import { MatTableModule } from '@angular/material/table';

describe('AnimalEstimacaoComponent', () => {
  let component: AnimalEstimacaoComponent;
  let fixture: ComponentFixture<AnimalEstimacaoComponent>;

  let animaisMock : AnimalEstimacao[] = (usuariosMock[0] as Cliente).animaisEstimacao;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ 
        AnimalEstimacaoComponent
      ],
      imports: [
        CommonModule,
        MatButtonModule,
        MatFormFieldModule,
        MatCardModule,
        MatInputModule,
        MatSelectModule,
        MatDialogModule,
        MatListModule,
        FormsModule,
        ReactiveFormsModule,
        ConfigModule,
        MatPaginatorModule,
        MatTooltipModule,
        MatExpansionModule,
        MatChipsModule,
        MatTableModule,
        MatCheckboxModule,
        MatIconModule,
        HttpClientTestingModule,
        BrowserAnimationsModule,
      ],
      providers: [
        { provide: 'AnimalNotificationService', useFactory: () => (new NotificationService<AnimalEstimacao>()) },
        {
          provide: MatDialogRef, useValue:{}
          },
          {
            provide: MatDialogRef,
            useValue: {}
          },
          {
            provide: MAT_DIALOG_DATA,
            useValue: {}
          },
          JwtHelper
      ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(AnimalEstimacaoComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
