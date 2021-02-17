import 'zone.js/dist/zone'
import { BrowserModule } from '@angular/platform-browser';
import { AcessoModule } from '../acesso/acesso.module';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { AppRoutingModule } from '../app-routing.module';
import { HomeComponent } from '../home/home.component';
import { MatSidenavModule } from '@angular/material/sidenav';
import { MatToolbarModule } from '@angular/material/toolbar';
import { MatIconModule } from '@angular/material/icon';
import { MatButtonModule } from '@angular/material/button';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatListModule } from '@angular/material/list';
import { MatInputModule } from '@angular/material/input';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { MatCardModule } from '@angular/material/card';
import { JwtHelper } from '../util/jwt-helper';
import { PerfisModule } from '../perfis/perfis.module';
import { AvaliacoesModule } from '../avaliacoes/avaliacoes.module';
import { ConfigModule } from '../config/config.module';
import { MatPaginatorModule } from '@angular/material/paginator';
import { MatCheckboxModule } from '@angular/material/checkbox';
import { MatDividerModule } from '@angular/material/divider';
import { MatChipsModule } from '@angular/material/chips';
import { MatSelectModule } from '@angular/material/select';
import { MatTableModule } from '@angular/material/table';
import { MatDialogModule } from '@angular/material/dialog';
import { MatDatepickerModule } from '@angular/material/datepicker';
import { NativeDateModule } from '@angular/material/core';
import { MatTabsModule } from '@angular/material/tabs';
import { AgendamentosModule } from '../agendamentos/agendamentos.module';
import { GeolocalizacaoModule } from '../geolocalizacao/geolocalizacao.module';
import { MatSliderModule } from '@angular/material/slider';
import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { Router } from '@angular/router';
import { HttpClientTestingModule } from '@angular/common/http/testing';
import { ListaServicosDetalhadosComponent } from '../lista-servicos-detalhados/lista-servicos-detalhados.component';
import { PrestadorComponent } from '../prestador/prestador.component';
describe('HomeComponent', () => {
  let component: HomeComponent;
  let fixture: ComponentFixture<HomeComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ HomeComponent, ListaServicosDetalhadosComponent, PrestadorComponent ],
      providers: [
        {provide: Router, useValue: {navigate: () => true}},
        JwtHelper
      ],
      imports: [
        AcessoModule,
        PerfisModule,
        BrowserModule,
        MatFormFieldModule,
        AppRoutingModule,
        MatInputModule,
        AvaliacoesModule,
        HttpClientTestingModule,
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
      ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(HomeComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});