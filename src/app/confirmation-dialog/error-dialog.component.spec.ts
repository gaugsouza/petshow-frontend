import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ErrorDialogComponent } from './error-dialog.component';
import { BrowserModule } from '@angular/platform-browser';
import { AcessoModule } from '../acesso/acesso.module';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { AppRoutingModule } from '../app-routing.module';
import { MatSidenavModule } from '@angular/material/sidenav';
import { MatToolbarModule } from '@angular/material/toolbar';
import { MatIconModule } from '@angular/material/icon';
import { MatButtonModule } from '@angular/material/button';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatListModule } from '@angular/material/list';
import { MatInputModule } from '@angular/material/input';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { MatCardModule } from '@angular/material/card';
import { PerfisModule } from '../perfis/perfis.module';
import { AvaliacoesModule } from '../avaliacoes/avaliacoes.module';
import { ConfigModule } from '../config/config.module';
import { MatPaginatorModule } from '@angular/material/paginator';
import { MatCheckboxModule } from '@angular/material/checkbox';
import { MatDividerModule } from '@angular/material/divider';
import { MatChipsModule } from '@angular/material/chips';
import { MatSelectModule } from '@angular/material/select';
import { MatTableModule } from '@angular/material/table';
import { MatDialogModule, MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { MatDatepickerModule } from '@angular/material/datepicker';
import { MatTabsModule } from '@angular/material/tabs';
import { AgendamentosModule } from '../agendamentos/agendamentos.module';
import { GeolocalizacaoModule } from '../geolocalizacao/geolocalizacao.module';
import { MatSliderModule } from '@angular/material/slider';
import { NativeDateModule } from '@angular/material/core';
import { HttpClientTestingModule } from '@angular/common/http/testing';
import { HomeComponent } from '../home/home.component';
import { ListaServicosDetalhadosComponent } from '../lista-servicos-detalhados/lista-servicos-detalhados.component';
import { PrestadorComponent } from '../prestador/prestador.component';
import { JwtHelper } from '../util/jwt-helper';
import {APP_BASE_HREF} from '@angular/common';
import { MatTooltipModule } from '@angular/material/tooltip';
import {MatProgressSpinnerModule} from '@angular/material/progress-spinner';
import {MatAutocompleteModule} from '@angular/material/autocomplete'; 

describe('ConfirmationDialogComponent', () => {
  let component: ErrorDialogComponent;
  let fixture: ComponentFixture<ErrorDialogComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ ErrorDialogComponent, HomeComponent, ListaServicosDetalhadosComponent, PrestadorComponent ],
      imports: [
        AcessoModule,
        PerfisModule,
        BrowserModule,
        MatFormFieldModule,
        AppRoutingModule,
        MatInputModule,
        AvaliacoesModule,
        MatSidenavModule,
        BrowserAnimationsModule,
        MatToolbarModule,
        MatIconModule,
        MatButtonModule,
        MatListModule,
        FormsModule,
        ReactiveFormsModule,
        MatCardModule,
        ConfigModule,
        MatPaginatorModule,
        AgendamentosModule,
        MatCheckboxModule,
        MatChipsModule,
        MatSelectModule,
        MatDividerModule,
        MatDialogModule,
        MatTableModule,
        MatDatepickerModule,
        NativeDateModule,
        MatTabsModule,
        GeolocalizacaoModule,
        MatSliderModule,
        HttpClientTestingModule,
        MatTooltipModule,
        MatProgressSpinnerModule,
        MatAutocompleteModule
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
        JwtHelper,
        {
          provide: APP_BASE_HREF,
          useValue: '/'
        }
      ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(ErrorDialogComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
