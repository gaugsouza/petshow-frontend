import { ComponentFixture, TestBed } from '@angular/core/testing';
import { BuscaComponent } from '../busca/busca.component';
import { MapaComponent } from '../mapa/mapa.component';
import { GeolocalizacaoComponent } from './geolocalizacao.component';
import { ConfigModule } from '../../config/config.module';
import { MatDialogModule } from '@angular/material/dialog';
import { MatButtonModule } from '@angular/material/button';
import { MatCardModule } from '@angular/material/card';
import {MatListModule} from '@angular/material/list';
import { MatIconModule } from '@angular/material/icon';
import { MatInputModule } from '@angular/material/input';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { HttpClientTestingModule } from '@angular/common/http/testing';
import { JwtHelper } from '../../util/jwt-helper';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';


describe('GeolocalizacaoComponent', () => {
  let component: GeolocalizacaoComponent;
  let fixture: ComponentFixture<GeolocalizacaoComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [
        GeolocalizacaoComponent,
        BuscaComponent,
        MapaComponent
      ],
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
        HttpClientTestingModule,
        BrowserAnimationsModule,
      ],
      providers: [
        JwtHelper
      ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(GeolocalizacaoComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
