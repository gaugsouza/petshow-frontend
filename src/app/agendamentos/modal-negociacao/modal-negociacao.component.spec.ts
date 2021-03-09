import { ComponentFixture, TestBed } from '@angular/core/testing';
import { MatPaginatorModule } from '@angular/material/paginator';
import { MatListModule } from '@angular/material/list';
import { MatCheckboxModule } from '@angular/material/checkbox';
import { MatCardModule } from '@angular/material/card';
import { MatInputModule } from '@angular/material/input';
import { FormsModule } from '@angular/forms';
import { MatTabsModule } from '@angular/material/tabs';
import { MatStepperModule } from '@angular/material/stepper';
import { MatButtonModule } from '@angular/material/button';
import { MatDatepickerModule } from '@angular/material/datepicker';
import { MatNativeDateModule } from '@angular/material/core/';
import { MatSelectModule } from '@angular/material/select';
import { MatDialogModule, MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { ConfigModule } from '../../config/config.module';
import { ModalNegociacaoComponent } from './modal-negociacao.component';
import { HttpClientTestingModule } from '@angular/common/http/testing';
import { JwtHelper } from '../../util/jwt-helper';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';

describe('ModalNegociacaoComponent', () => {
  let component: ModalNegociacaoComponent;
  let fixture: ComponentFixture<ModalNegociacaoComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ ModalNegociacaoComponent ],
      imports: [
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
        MatSelectModule,
        MatDialogModule,
        HttpClientTestingModule,
        BrowserAnimationsModule,
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
    fixture = TestBed.createComponent(ModalNegociacaoComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
