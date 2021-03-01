import { CommonModule } from '@angular/common';
import { ComponentFixture, TestBed } from '@angular/core/testing';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { MatButtonModule } from '@angular/material/button';
import { MatCheckboxModule } from '@angular/material/checkbox';
import { MatDialogModule } from '@angular/material/dialog';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatIconModule } from '@angular/material/icon';
import { MatInputModule } from '@angular/material/input';
import { MatSelectModule } from '@angular/material/select';
import { BrowserModule } from '@angular/platform-browser';
import { ConfigModule } from '../../config/config.module';
import { EnderecoCadastroComponent } from '../cadastro/endereco-cadastro/endereco-cadastro.component';

import { CadastroEmpresaComponent } from './cadastro-empresa.component';

describe('CadastroEmpresaComponent', () => {
  let component: CadastroEmpresaComponent;
  let fixture: ComponentFixture<CadastroEmpresaComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [
        EnderecoCadastroComponent,
        CadastroEmpresaComponent, ],
        imports: [
          CommonModule,
          FormsModule,
          ReactiveFormsModule,
          BrowserModule,
          MatInputModule,
          MatButtonModule,
          MatFormFieldModule,
          MatSelectModule,
          ConfigModule,
          MatDialogModule,
          MatIconModule,
          MatCheckboxModule,
        ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(CadastroEmpresaComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
