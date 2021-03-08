import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { MatSlideToggleModule } from '@angular/material/slide-toggle'; 
import { ServicosComponent } from './servicos.component';
import { MatListModule } from '@angular/material/list';
import { MatInputModule } from '@angular/material/input';
import { MatSelectModule } from '@angular/material/select';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { MatDialogModule } from '@angular/material/dialog';
import { MatCardModule } from '@angular/material/card';
import { MatPaginatorModule } from '@angular/material/paginator';
import { JwtHelper } from '../../util/jwt-helper';
import { NotificationService } from '../../servicos/notification.service';
import { ServicoDetalhado } from '../../interfaces/servico-detalhado';
import { MatChipsModule } from '@angular/material/chips';
import { MatIconModule } from '@angular/material/icon';
import { CommonModule } from '@angular/common';
import { MatButtonModule } from '@angular/material/button';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatTooltipModule } from '@angular/material/tooltip';
import { MatPseudoCheckboxModule } from '@angular/material/core';
import { MatTabsModule } from '@angular/material/tabs';
import { MatTableModule } from '@angular/material/table';
import { ConfigModule } from '../../config/config.module';
import { MatExpansionModule } from '@angular/material/expansion';

describe('ServicosComponent', () => {
  let component: ServicosComponent;
  let fixture: ComponentFixture<ServicosComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ServicosComponent ],
      providers: [
        JwtHelper,
        { provide: 'ServicoNotificationService', useFactory: () => (new NotificationService<ServicoDetalhado>()) }
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
        MatPseudoCheckboxModule,
        MatIconModule,
        MatSlideToggleModule,
        MatTabsModule,
     ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ServicosComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
