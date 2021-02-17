import { ComponentFixture, TestBed } from '@angular/core/testing';
import { MatDialogModule } from '@angular/material/dialog';
import { MatButtonModule } from '@angular/material/button';
import { MatCardModule } from '@angular/material/card';
import {MatListModule} from '@angular/material/list';
import { MatIconModule } from '@angular/material/icon';
import { MatInputModule } from '@angular/material/input';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { MapaComponent } from './mapa.component';
import { ConfigModule } from '../../config/config.module';
import { HttpClientTestingModule } from '@angular/common/http/testing';
import { JwtHelper } from '../../util/jwt-helper';

describe('MapaComponent', () => {
  let component: MapaComponent;
  let fixture: ComponentFixture<MapaComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ 
        MapaComponent,
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
        HttpClientTestingModule
      ],
      providers: [
        JwtHelper
      ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(MapaComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
