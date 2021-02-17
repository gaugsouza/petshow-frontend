import { ComponentFixture, TestBed } from '@angular/core/testing';
import { MatDialogModule, MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { MatButtonModule } from '@angular/material/button';
import { MatCardModule } from '@angular/material/card';
import {MatListModule} from '@angular/material/list';
import { MatIconModule } from '@angular/material/icon';
import { MatInputModule } from '@angular/material/input';

import { DialogServicoSelecionadoComponent } from './dialog-servico-selecionado.component';
import { ConfigModule } from '../../config/config.module';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { JwtHelper } from '../../util/jwt-helper';
import { HttpClientTestingModule } from '@angular/common/http/testing';

describe('DialogServicoSelecionadoComponent', () => {
  let component: DialogServicoSelecionadoComponent;
  let fixture: ComponentFixture<DialogServicoSelecionadoComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ DialogServicoSelecionadoComponent ],
      imports: [
        ConfigModule,
        MatDialogModule,
        MatButtonModule,
        MatCardModule,
        MatListModule,
        MatIconModule,
        MatInputModule,
        FormsModule, 
        ReactiveFormsModule,
        HttpClientTestingModule
      ],
      providers: [
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
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(DialogServicoSelecionadoComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
