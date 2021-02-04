import { ComponentFixture, TestBed } from '@angular/core/testing';
import { BrowserModule } from '@angular/platform-browser';
import { MatSidenavModule } from '@angular/material/sidenav';
import { MatToolbarModule } from '@angular/material/toolbar';
import { MatIconModule } from '@angular/material/icon';
import { MatButtonModule } from '@angular/material/button';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatListModule } from '@angular/material/list';
import { MatInputModule } from '@angular/material/input';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { MatCardModule } from '@angular/material/card';
import { ConfigModule } from '../../config/config.module';
import { MatPaginatorModule } from '@angular/material/paginator';
import { MatCheckboxModule } from '@angular/material/checkbox';
import {MatDividerModule} from '@angular/material/divider'; 
import { MatChipsModule } from '@angular/material/chips';
import {MatTableModule} from '@angular/material/table'; 
import { MatDialogModule, MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { DialogComparacaoComponent } from './dialog-comparacao.component';
import { JwtHelper } from '../../util/jwt-helper';
import { HttpClientTestingModule } from '@angular/common/http/testing';

describe('DialogComparacaoComponent', () => {
  let component: DialogComparacaoComponent;
  let fixture: ComponentFixture<DialogComparacaoComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ DialogComparacaoComponent ],
      imports: [
        BrowserModule,
        MatFormFieldModule,
        ConfigModule,
        MatInputModule,
        MatSidenavModule,
        MatToolbarModule,
        MatIconModule,
        MatButtonModule,
        MatListModule,
        FormsModule,
        ReactiveFormsModule,
        MatCardModule,
        ConfigModule,
        MatPaginatorModule,
        MatCheckboxModule,
        MatChipsModule,
        MatDialogModule,
        MatDividerModule,
        MatTableModule,
        HttpClientTestingModule,
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
    fixture = TestBed.createComponent(DialogComparacaoComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
