import { CommonModule } from '@angular/common';
import { ComponentFixture, TestBed } from '@angular/core/testing';
import { MatIconModule } from '@angular/material/icon';
import { MatButtonModule } from '@angular/material/button';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { ConfigModule } from '../../config/config.module';
import { MatPaginatorModule } from '@angular/material/paginator';
import {MatCardModule} from '@angular/material/card';

import { AvaliacaoAgendamentoComponent } from './avaliacao-agendamento.component';
import { HttpClientTestingModule } from '@angular/common/http/testing';
import { JwtHelper } from '../../util/jwt-helper';

describe('AvaliacaoAgendamentoComponent', () => {
  let component: AvaliacaoAgendamentoComponent;
  let fixture: ComponentFixture<AvaliacaoAgendamentoComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ AvaliacaoAgendamentoComponent ],
      imports: [  CommonModule,
        MatIconModule,
        MatButtonModule,
        FormsModule,
        ReactiveFormsModule,
        MatFormFieldModule,
        MatInputModule,
        ConfigModule,
        MatPaginatorModule,
        MatCardModule,
        HttpClientTestingModule,
      ],
      providers: [
        JwtHelper
      ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(AvaliacaoAgendamentoComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
